// Per-context program cache. Never read shader status before the driver finishes.
export function abortError() {
  return new DOMException("Overlay compilation cancelled", "AbortError");
}

export function checkSignal(signal) {
  if (signal?.aborted) throw signal.reason ?? abortError();
}

export function delay(ms, signal) {
  checkSignal(signal);
  return new Promise((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(signal.reason ?? abortError()); };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", abort, { once: true });
  });
}

export async function bounded(promise, ms, signal, message = "Overlay operation timed out") {
  checkSignal(signal);
  let timer;
  let abort;
  try {
    return await Promise.race([promise, new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(message)), ms);
      abort = () => reject(signal.reason ?? abortError());
      signal?.addEventListener("abort", abort, { once: true });
    })]);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

export function createProgramCache(gl, vertexSource, {
  timeoutMs = 15000,
  pollMs = 24,
  fallbackDelayMs = 100,
  onStage = () => {},
} = {}) {
  const cache = new Map();
  const ext = gl.getExtension("KHR_parallel_shader_compile") || gl.getExtension("WEBGL_parallel_shader_compile");
  let disposed = false;
  let pending = 0;
  let serial = Promise.resolve();
  const check = (signal) => {
    checkSignal(signal);
    if (disposed || gl.isContextLost()) throw abortError();
  };

  function retire(program, vertex, fragment) {
    const started = performance.now();
    const poll = () => {
      if (gl.isContextLost()) return;
      if (ext && gl.getProgramParameter(program, ext.COMPLETION_STATUS_KHR)) {
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        return;
      }
      // A timed-out context is abandoned by the surface. Do not keep polling
      // forever or introduce a synchronous LINK_STATUS read during cleanup.
      if (performance.now() - started >= timeoutMs) return;
      const timer = setTimeout(poll, Math.max(100, pollMs));
      timer.unref?.(); // Node test runner; browser timers are numeric.
    };
    if (ext) poll();
  }

  async function compile(source, label, signal) {
    check(signal);
    if (cache.has(source)) { onStage(label, "cached"); return cache.get(source); }
    let vertex = null;
    let fragment = null;
    let program = null;
    let completed = false;
    const started = performance.now();
    pending++;
    try {
      onStage(label, "compile-start");
      await delay(0, signal);
      check(signal);
      vertex = gl.createShader(gl.VERTEX_SHADER);
      fragment = gl.createShader(gl.FRAGMENT_SHADER);
      program = gl.createProgram();
      if (!vertex || !fragment || !program) throw new Error(`Cannot allocate shader: ${label}`);
      gl.shaderSource(vertex, vertexSource);
      gl.shaderSource(fragment, source);
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.bindAttribLocation(program, 0, "aPosition");
      gl.compileShader(vertex);
      gl.compileShader(fragment);
      onStage(label, "link-start");
      gl.linkProgram(program);
      onStage(label, "gpu-wait");
      if (ext) {
        const waitStart = performance.now();
        while (true) {
          check(signal);
          if (gl.getProgramParameter(program, ext.COMPLETION_STATUS_KHR)) break;
          if (performance.now() - waitStart >= timeoutMs) throw new Error(`GPU compile timeout: ${label}`);
          await delay(pollMs, signal);
        }
      } else {
        // Without KHR there is no nonblocking completion query. Yield first;
        // LINK_STATUS below may still block, so explicitly diagnose this path.
        onStage(label, "synchronous-link-fallback");
        await delay(fallbackDelayMs, signal);
      }
      check(signal);
      completed = true;
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`${label}: ${gl.getProgramInfoLog(program) || "Shader link failed"}`);
      }
      cache.set(source, program);
      onStage(label, "ready", performance.now() - started);
      return program;
    } finally {
      pending--;
      // Deleting a pending program or explicitly losing its context can itself
      // synchronize with ANGLE. On cancellation leave it to context collection.
      if (!completed && program && vertex && fragment) retire(program, vertex, fragment);
      if (completed) {
        if (vertex) gl.deleteShader(vertex);
        if (fragment) gl.deleteShader(fragment);
        if (program && !cache.has(source)) gl.deleteProgram(program);
      }
    }
  }

  return {
    get(source, label, signal) {
      const run = serial.catch(() => {}).then(() => compile(source, label, signal));
      serial = run.catch(() => {});
      return run;
    },
    has(source) { return cache.has(source); },
    dispose() {
      disposed = true;
      if (!pending && !gl.isContextLost()) {
        for (const program of cache.values()) gl.deleteProgram(program);
      }
      cache.clear();
    },
  };
}

export function createCompileLease(sendMessage, { timeoutMs = 30000, requestTimeoutMs = 2000, heartbeatMs = 1000 } = {}) {
  return async function withLease(requesterId, signal, task) {
    const started = performance.now();
    let timer;
    const controller = new AbortController();
    const abort = () => controller.abort(signal.reason ?? abortError());
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    const request = (type) => bounded(sendMessage({ type, requesterId }), requestTimeoutMs, controller.signal, "Compile coordinator did not respond");
    try {
      while (true) {
        checkSignal(controller.signal);
        const response = await request("ACQUIRE_OVERLAY_COMPILE_SLOT");
        if (!response?.ok) throw new Error(response?.error || "Compile coordinator unavailable");
        if (response.acquired) break;
        if (performance.now() - started >= timeoutMs) throw new Error("Compile slot timeout");
        await delay(Math.max(80, Math.min(1000, Number(response.retryAfterMs) || 160)), controller.signal);
      }
      const heartbeat = async () => {
        try {
          const response = await request("REFRESH_OVERLAY_COMPILE_SLOT");
          if (!response?.refreshed) throw new Error("Compile slot ownership lost");
          checkSignal(controller.signal);
          timer = setTimeout(heartbeat, heartbeatMs);
        } catch (error) { controller.abort(error); }
      };
      timer = setTimeout(heartbeat, heartbeatMs);
      const verify = async () => {
        checkSignal(controller.signal);
        const response = await request("REFRESH_OVERLAY_COMPILE_SLOT");
        if (!response?.refreshed) throw new Error("Compile slot ownership lost");
      };
      return await task(controller.signal, verify);
    } finally {
      clearTimeout(timer);
      controller.abort(abortError());
      signal?.removeEventListener("abort", abort);
      // Release even if acquire timed out: the worker may have granted it just
      // before its response was lost. Messages from this sender retain order.
      await bounded(sendMessage({ type: "RELEASE_OVERLAY_COMPILE_SLOT", requesterId }), requestTimeoutMs).catch(() => {});
    }
  };
}
