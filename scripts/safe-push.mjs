import { spawnSync, spawn } from "node:child_process";

function run(cmd, args, options = {}) {
  const isWindows = process.platform === "win32";
  const executable = isWindows ? "cmd.exe" : cmd;
  const execArgs = isWindows ? ["/c", cmd, ...args] : args;

  const result = spawnSync(executable, execArgs, {
    stdio: options.silent ? "pipe" : "inherit",
    encoding: "utf-8",
    ...options,
  });

  if (result.status !== 0 && !options.allowFail) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  }
  return result;
}

async function main() {
  console.log("\x1b[35m=== OPA IMPRIMERIE - SAFE GIT PUSH PIPELINE ===\x1b[0m\n");

  // 1. Check git status
  console.log("\x1b[34m[1/4] Checking git working tree...\x1b[0m");
  const statusRes = run("git", ["status", "--porcelain"], { silent: true });
  const hasChanges = statusRes.stdout && statusRes.stdout.trim().length > 0;

  // 2. Run verification suite
  console.log("\x1b[34m[2/4] Running pre-push build & Playwright smoke tests...\x1b[0m");
  const verifyRes = run("node", ["scripts/pre-push-verify.mjs"]);
  if (verifyRes.status !== 0) {
    console.error("\x1b[31m[ERROR] Pre-push verification failed. Push aborted!\x1b[0m");
    process.exit(1);
  }

  // 3. Stage and commit if there are changes
  console.log("\x1b[34m[3/4] Staging changes and creating commit...\x1b[0m");
  if (hasChanges) {
    const customMessage = process.argv.slice(2).join(" ").trim();
    const commitMsg = customMessage || "chore: verified updates and tests passed";

    run("git", ["add", "-A"]);
    run("git", ["commit", "-m", commitMsg]);
    console.log(`\x1b[32mCommitted with message: "${commitMsg}"\x1b[0m`);
  } else {
    console.log("\x1b[33mNo uncommitted changes in working directory.\x1b[0m");
  }

  // 4. Push to current upstream branch
  console.log("\x1b[34m[4/4] Pushing to GitHub...\x1b[0m");
  const branchRes = run("git", ["branch", "--show-current"], { silent: true });
  const currentBranch = (branchRes.stdout || "master").trim();

  run("git", ["push", "origin", currentBranch]);
  console.log(`\n\x1b[32m✔ Successfully tested, committed, and pushed to origin/${currentBranch}!\x1b[0m`);
}

main().catch((err) => {
  console.error(`\x1b[31m[FATAL]\x1b[0m ${err.message}`);
  process.exit(1);
});
