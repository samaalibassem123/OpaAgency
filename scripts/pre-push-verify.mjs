import { spawn } from "node:child_process";
import http from "node:http";
import { chromium, webkit, devices } from "playwright";

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

function log(step, msg) {
  console.log(`\x1b[36m[PRE-PUSH VERIFY]\x1b[0m \x1b[1m${step}\x1b[0m ${msg}`);
}

function error(step, msg) {
  console.error(`\x1b[31m[PRE-PUSH VERIFY - FAILED]\x1b[0m \x1b[1m${step}\x1b[0m ${msg}`);
}

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === "win32";
    const cmd = isWindows ? "cmd.exe" : command;
    const cmdArgs = isWindows ? ["/c", command, ...args] : args;

    const child = spawn(cmd, cmdArgs, {
      stdio: "inherit",
      env: { ...process.env, PORT: String(PORT) },
    });

    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed with exit code ${code}`));
    });

    child.on("error", reject);
  });
}

function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode && res.statusCode < 500) {
            resolve();
          } else {
            retry();
          }
        })
        .on("error", retry);
    };

    const retry = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for server at ${url}`));
      } else {
        setTimeout(check, 500);
      }
    };

    check();
  });
}

async function runBrowserSmokeTest(browserType, deviceOptions, label) {
  log("SMOKE TEST", `Testing on ${label}...`);
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext(deviceOptions);
  const page = await context.newPage();

  const pageErrors = [];
  const consoleErrors = [];

  page.on("pageerror", (err) => {
    pageErrors.push(err.message || String(err));
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      // Ignore non-fatal third-party iframe tile notices
      if (!text.includes("tile.openstreetmap.org")) {
        consoleErrors.push(text);
      }
    }
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Wait for preloader to dismiss
  await page.waitForTimeout(2200);

  // Check for Next.js error banner
  const content = await page.content();
  const hasAppError =
    content.includes("Application error: a client-side exception has occurred") ||
    content.includes("Unhandled Runtime Error");

  if (hasAppError) {
    throw new Error(`Client-side application crash detected on ${label}!`);
  }

  // Check horizontal overflow
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  if (overflow) {
    throw new Error(`Horizontal layout overflow detected on ${label}!`);
  }

  // Scroll through page to trigger animations & scrolltriggers
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(200);
  }

  await browser.close();

  if (pageErrors.length > 0) {
    throw new Error(`Page errors on ${label}: ${pageErrors.join(" | ")}`);
  }

  log("PASS", `${label} verified successfully with 0 exceptions.`);
}

async function main() {
  log("STEP 1/3", "Running Next.js production build...");
  await runCommand("npm", ["run", "build"]);

  log("STEP 2/3", `Starting production test server on port ${PORT}...`);
  const isWindows = process.platform === "win32";
  const cmd = isWindows ? "cmd.exe" : "npm";
  const cmdArgs = isWindows ? ["/c", "npm", "start", "--", "-p", String(PORT)] : ["start", "--", "-p", String(PORT)];

  const serverProcess = spawn(cmd, cmdArgs, {
    stdio: "pipe",
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await waitForServer(BASE_URL);
    log("SERVER", `Production server is ready at ${BASE_URL}`);

    log("STEP 3/3", "Executing Playwright WebKit & Chromium smoke checks...");
    // 1. Mobile WebKit (iPhone 11) - Critical for iOS Safari exception detection
    await runBrowserSmokeTest(webkit, devices["iPhone 11"], "iPhone 11 (WebKit)");

    // 2. Desktop Chromium
    await runBrowserSmokeTest(
      chromium,
      { viewport: { width: 1280, height: 800 } },
      "Desktop Chrome (1280x800)"
    );

    log("SUCCESS", "\x1b[32mAll pre-push build and smoke tests passed!\x1b[0m");
  } finally {
    log("CLEANUP", "Terminating test server...");
    if (isWindows) {
      spawn("taskkill", ["/pid", String(serverProcess.pid), "/f", "/t"]);
    } else {
      serverProcess.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  error("FATAL", err.message);
  process.exit(1);
});
