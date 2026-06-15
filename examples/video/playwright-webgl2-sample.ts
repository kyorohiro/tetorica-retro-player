import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type PlaywrightModule = typeof import("playwright");

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../..");
const vitePort = 4175;
const sampleUrl = `http://127.0.0.1:${vitePort}/examples/video/playwright-webgl2-sample.html`;
const outputDir = resolve(__dirname, "artifacts");
const screenshotPath = resolve(outputDir, "playwright-webgl2-sample.png");

const wait = (ms: number) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

const waitForServer = async (url: string, timeoutMs: number) => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until Vite is ready.
    }

    await wait(250);
  }

  throw new Error(`Timed out waiting for Vite server at ${url}`);
};

const main = async () => {
  let playwright: PlaywrightModule;

  try {
    playwright = await import("playwright");
  } catch {
    throw new Error(
      "Missing optional dependency 'playwright'. Run `cd examples && npm install -D playwright` first.",
    );
  }

  const vite = spawn(
    "npm",
    ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(vitePort), "--strictPort"],
    {
      cwd: repoRoot,
      stdio: "pipe",
      env: {
        ...process.env,
        BROWSER: "none",
      },
    },
  );

  let viteStdout = "";
  let viteStderr = "";

  vite.stdout.on("data", (chunk) => {
    viteStdout += String(chunk);
  });
  vite.stderr.on("data", (chunk) => {
    viteStderr += String(chunk);
  });

  try {
    await waitForServer(sampleUrl, 30_000);

    const browser = await playwright.chromium.launch({
      headless: true,
      args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
    });

    try {
      const page = await browser.newPage({
        viewport: {
          width: 760,
          height: 620,
        },
      });

      await page.goto(sampleUrl, { waitUntil: "networkidle" });
      await page.waitForFunction(() => {
        return Boolean((window as typeof window & { __RETRO_SAMPLE__?: { ok: boolean } }).__RETRO_SAMPLE__);
      });

      const result = await page.evaluate(() => {
        return (window as typeof window & {
          __RETRO_SAMPLE__?: { ok: boolean; error?: string; firstPixels?: number[] };
        }).__RETRO_SAMPLE__;
      });

      if (!result?.ok) {
        throw new Error(`Sample page reported failure: ${result?.error ?? "unknown error"}`);
      }

      await mkdir(outputDir, { recursive: true });
      const canvas = page.locator("#preview");
      await canvas.screenshot({ path: screenshotPath });
      await writeFile(
        resolve(outputDir, "playwright-webgl2-sample.json"),
        JSON.stringify(result, null, 2),
      );

      console.log(`Rendered WebGL2 sample to ${screenshotPath}`);
      console.log(`Pixel probe: ${JSON.stringify(result.firstPixels ?? [])}`);
    } finally {
      await browser.close();
    }
  } finally {
    vite.kill("SIGTERM");
  }

  if (vite.exitCode && vite.exitCode !== 0) {
    throw new Error(`Vite exited unexpectedly.\nstdout:\n${viteStdout}\nstderr:\n${viteStderr}`);
  }
};

await main();
