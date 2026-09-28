import { defineConfig } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";
// Optional npm-provided headless Chromium for network-restricted CI/sandboxes.
// Normal local installs use the standard browser downloaded by Playwright.
let launchOptions = {};
if (process.env.FRESHO_SANDBOX_BROWSER) {
  const chromiumPackage = require.resolve("@sparticuz/chromium");
  const binaryDir = path.join(path.join(path.dirname(chromiumPackage), "../bin"));
  const base = path.resolve(".cache/browser-libs");
  fs.mkdirSync(base, { recursive: true });
  const archive = path.resolve(".cache/al2023.tar");
  if (!fs.existsSync(path.join(base, "lib/libnspr4.so"))) {
    fs.writeFileSync(
      archive,
      zlib.brotliDecompressSync(
        fs.readFileSync(path.join(binaryDir, "al2023.tar.br")),
      ),
    );
    execFileSync("tar", ["-xf", archive, "-C", base]);
  }
  const browser = "/tmp/fresho-test-chromium";
  if (!fs.existsSync(browser)) {
    fs.writeFileSync(
      browser,
      zlib.brotliDecompressSync(
        fs.readFileSync(path.join(binaryDir, "chromium.br")),
      ),
      { mode: 0o755 },
    );
  }
  process.env.LD_LIBRARY_PATH = path.join(base, "lib");
  launchOptions = {
    executablePath: browser,
    args: [
      "--no-sandbox",
      "--no-zygote",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  };
}
export default defineConfig({
  testDir: "tests",
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://localhost:3000",
    launchOptions,
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
