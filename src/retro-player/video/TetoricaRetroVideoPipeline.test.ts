import { afterEach, describe, expect, it, vi } from "vitest";
import { TetoricaRetroVideoPipeline, type RetroVideoFilterState } from "./TetoricaRetroVideoPipeline";

type Entry = { pass1: WebGLProgram; pass2: WebGLProgram };
type Internals = {
  windowsLiteProgramCache: Map<string, Entry>;
  sharedProgramCache: Map<string, WebGLProgram>;
  sharedProgramCompileInflight: Map<string, Promise<WebGLProgram>>;
  windowsLiteVariantCompileInflight: Map<string, Promise<Entry>>;
  reserveCompileTurn(): { waitForCompileTurn: Promise<void>; releaseCompileTurn(): void };
  compileWindowsLiteVariant(key: string): Promise<Entry>;
  getOrCompileSharedProgram(stage: string, source: string, key: string): Promise<WebGLProgram>;
  updateCompileState(label: string): Promise<void>;
  ensureBeamDownscaleProgram(): Promise<void>;
  beamDownscaleProgram: WebGLProgram | null;
};

function createPipeline() {
  const gl = {
    VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, LINK_STATUS: 3,
    drawingBufferWidth: 2, drawingBufferHeight: 2,
    bindFramebuffer: vi.fn(), activeTexture: vi.fn(), viewport: vi.fn(), clearColor: vi.fn(), clear: vi.fn(), texImage2D: vi.fn(), drawArrays: vi.fn(), getError: vi.fn(),
    createBuffer: vi.fn(() => ({})), createVertexArray: vi.fn(() => ({})), createTexture: vi.fn(() => ({})),
    createShader: vi.fn(() => ({})), createProgram: vi.fn(() => ({})),
    getExtension: vi.fn(() => ({ COMPLETION_STATUS_KHR: 4 })),
    getProgramParameter: vi.fn(() => true), getProgramInfoLog: vi.fn(() => "failure"),
    isContextLost: vi.fn(() => false),
    bindBuffer: vi.fn(), bufferData: vi.fn(), bindVertexArray: vi.fn(), enableVertexAttribArray: vi.fn(), vertexAttribPointer: vi.fn(),
    bindTexture: vi.fn(), pixelStorei: vi.fn(), texParameteri: vi.fn(), useProgram: vi.fn(), uniform1i: vi.fn(), getUniformLocation: vi.fn(),
    attachShader: vi.fn(), bindAttribLocation: vi.fn(), shaderSource: vi.fn(), compileShader: vi.fn(), linkProgram: vi.fn(),
    deleteShader: vi.fn(), deleteProgram: vi.fn(), deleteBuffer: vi.fn(), deleteTexture: vi.fn(), deleteVertexArray: vi.fn(), deleteFramebuffer: vi.fn(),
  };
  const pipeline = new TetoricaRetroVideoPipeline(gl as unknown as WebGL2RenderingContext, {} as WebGLProgram, true);
  return { pipeline, internal: pipeline as unknown as Internals, gl };
}

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

describe("video pipeline compile lifecycle", () => {
  it("releases its queue turn when the variant becomes cached during the wait", async () => {
    const { pipeline, internal } = createPipeline();
    const blocker = internal.reserveCompileTurn();
    const pending = internal.compileWindowsLiteVariant("basic:basic");
    const cached = { pass1: {} as WebGLProgram, pass2: {} as WebGLProgram };
    internal.windowsLiteProgramCache.set("basic:basic", cached);
    blocker.releaseCompileTurn();
    await expect(pending).resolves.toBe(cached);
    const next = internal.reserveCompileTurn();
    const completed = await Promise.race([next.waitForCompileTurn.then(() => true), new Promise(resolve => setTimeout(() => resolve(false), 50))]);
    expect(completed).toBe(true);
    expect(internal.windowsLiteVariantCompileInflight.size).toBe(0);
    next.releaseCompileTurn();
    pipeline.dispose();
  });

  it("releases a queued turn after disposal without submitting shaders", async () => {
    const { pipeline, internal, gl } = createPipeline();
    const blocker = internal.reserveCompileTurn();
    const pending = internal.compileWindowsLiteVariant("basic:basic");
    pipeline.dispose();
    blocker.releaseCompileTurn();
    await expect(pending).rejects.toThrow(/disposed/i);
    const next = internal.reserveCompileTurn();
    const completed = await Promise.race([next.waitForCompileTurn.then(() => true), new Promise(resolve => setTimeout(() => resolve(false), 50))]);
    expect(completed).toBe(true);
    expect(gl.compileShader).not.toHaveBeenCalled();
    next.releaseCompileTurn();
  });

  it("removes an inflight entry even if preparation fails before shaders are allocated", async () => {
    const { pipeline, internal } = createPipeline();
    vi.spyOn(internal, "updateCompileState").mockRejectedValueOnce(new Error("preparation failed"));
    await expect(internal.getOrCompileSharedProgram("pass1", "source", "basic:basic")).rejects.toThrow("preparation failed");
    expect(internal.sharedProgramCompileInflight.size).toBe(0);
    pipeline.dispose();
  });

  it("does not repopulate the program cache after disposal during a GPU wait", async () => {
    vi.useFakeTimers();
    const { pipeline, internal, gl } = createPipeline();
    gl.getProgramParameter.mockReturnValue(false);
    const pending = internal.getOrCompileSharedProgram("pass1", "source", "basic:basic");
    const result = pending.catch(error => error);
    await vi.advanceTimersByTimeAsync(40);
    pipeline.dispose();
    gl.getProgramParameter.mockReturnValue(true);
    await vi.advanceTimersByTimeAsync(30);
    expect(await result).toBeInstanceOf(Error);
    expect(internal.sharedProgramCache.size).toBe(0);
    expect(internal.sharedProgramCompileInflight.size).toBe(0);
  });

  it("deduplicates concurrent support program requests after their queue wait", async () => {
    vi.useFakeTimers();
    const { pipeline, internal, gl } = createPipeline();
    const both = Promise.all([internal.ensureBeamDownscaleProgram(), internal.ensureBeamDownscaleProgram()]);
    await vi.runAllTimersAsync();
    await both;
    expect(gl.createProgram).toHaveBeenCalledTimes(1);
    pipeline.dispose();
  });

  it("does not install a support program after disposal", async () => {
    vi.useFakeTimers();
    const { pipeline, internal, gl } = createPipeline();
    gl.getProgramParameter.mockReturnValue(false);
    const pending = internal.ensureBeamDownscaleProgram().catch(error => error);
    await vi.advanceTimersByTimeAsync(40);
    pipeline.dispose();
    gl.getProgramParameter.mockReturnValue(true);
    await vi.advanceTimersByTimeAsync(30);
    expect(await pending).toBeInstanceOf(Error);
    expect(internal.beamDownscaleProgram).toBeNull();
  });

  it("frees the vertex buffer and makes disposal idempotent", () => {
    const { pipeline, gl } = createPipeline();
    const buffer = gl.createBuffer.mock.results[0].value;
    pipeline.dispose();
    pipeline.dispose();
    expect(gl.deleteBuffer).toHaveBeenCalledExactlyOnceWith(buffer);
    expect(gl.deleteVertexArray).toHaveBeenCalledTimes(1);
  });
});


it("does not perform diagnostic GPU readbacks during normal playback", () => {
  vi.stubEnv("DEV", false);
  const { pipeline, gl } = createPipeline();
  pipeline.setSource({ width: 2, height: 2, data: new Uint8Array(16) });
  pipeline.setFilterState({ isFilterEnabled: false } as RetroVideoFilterState);
  pipeline.render();
  expect(gl.drawArrays).toHaveBeenCalledTimes(1);
  expect(gl.getError).not.toHaveBeenCalled();
  pipeline.dispose();
  pipeline.render();
  expect(gl.drawArrays).toHaveBeenCalledTimes(1);
});
