# PROJECT-SCOPED MCP INTEGRATION GUIDE
## Workspace Configuration: `.agents/mcp_config.json`

---

## 1. Overview & Isolation Architecture

In accordance with strict project security and isolation standards:
- **Zero Global Mutation:** Global configuration files in `~/.gemini/config/` remain completely untouched.
- **Project-Scoped:** All MCP configurations reside strictly in `.agents/mcp_config.json` at the workspace root.
- **Zero Plaintext Secrets:** No API keys or tokens are stored in the configuration file. Authentication relies on standard environment variables or OAuth endpoints.

---

## 2. Server Matrix & Verified Connection Status

| Server ID | Type / Transport | Official Endpoint or Executable | Status in Environment | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`shadcn`** | Local / Stdio | `npx -y shadcn@latest mcp` | **Verified** (Node.js v24.13.0, npm 11.2.0, CLI v4.23.0 available) | Component discovery, block inspection, and automated registry installation. |
| **`context7`** | Remote / HTTP | `https://mcp.context7.com/mcp` | **Active** (Streamable HTTP endpoint accessible) | Real-time, up-to-date documentation retrieval for Next.js, React, Tailwind, Framer Motion, and GSAP. |
| **`playwright`** | Local / Stdio | `npx -y @playwright/mcp@latest` | **Verified** (CLI v0.0.85 downloaded and tested) | Automated browser testing, screenshot inspection, mobile responsiveness, and interaction validation. |
| **`next-devtools`**| Local / Stdio | `npx -y next-devtools-mcp@latest`| **Configured** (v0.4.0 verified; activates when Next.js dev server is running) | Runtime diagnostics, server error tracing, route inspection via `/_next/mcp`. |
| **`21st-dev`** | Local / Stdio | `npx -y @21st-dev/magic@latest` | **Configured** (Package verified; optional API key for premium catalog access) | UI inspiration, creative motion components, modern design patterns. |
| **`figma`** | Remote / HTTP | `https://mcp.figma.com/mcp` | **Optional** (Remote endpoint configured; active when OAuth token is supplied) | Direct design file reading, token extraction, and Figma Code Connect integration. |
| **`chrome-devtools`**| Local / Stdio| `npx -y chrome-devtools-mcp@latest`| **Configured** (v1.13.0 verified) | Deep browser performance profiling, console inspection, layout & rendering debugging. |

---

## 3. Detailed Setup & Authentication Guide

### 1. shadcn MCP (`shadcn`)
- **How it works:** Spawns the official shadcn CLI in MCP server mode. It reads your project's `components.json` to inspect installed components, search public/custom registries, and install components directly into your codebase.
- **Verification Command:**
  ```powershell
  npx -y shadcn@latest --version
  ```
- **Requirements:** Run `npx shadcn@latest init` once the Next.js application directory is initialized.

### 2. Context7 Documentation Server (`context7`)
- **How it works:** Connects via Streamable HTTP to `https://mcp.context7.com/mcp`.
- **Capabilities:** Fetches authoritative, up-to-date documentation for modern framework versions (e.g. Next.js 15/16, React 19, Tailwind CSS v4, Motion v12/14) to eliminate hallucinated or deprecated APIs.
- **Auth:** No key required for public documentation querying.

### 3. Playwright Browser Automation (`playwright`)
- **How it works:** Microsoft's official Playwright MCP server provides headful or headless browser automation tools.
- **Capabilities:** Navigates the local development server (e.g., `http://localhost:3000`), takes responsive viewport snapshots (mobile, tablet, desktop), clicks CTA buttons, tests WhatsApp redirect links, and verifies smooth scrolling behavior.
- **System Requirements:** Requires Playwright browsers installed locally:
  ```powershell
  npx playwright install chromium
  ```

### 4. Next.js DevTools MCP (`next-devtools`)
- **How it works:** Developed by Vercel to inspect a running Next.js application via the built-in development endpoint.
- **Usage Trigger:** Activated during Phase 8 when running `npm run dev`. Provides instant diagnosis of React Server Component (RSC) boundary issues, hydration errors, and route manifests.

### 5. 21st.dev UI Catalog (`21st-dev`)
- **How it works:** Queries the 21st.dev component database for creative UI elements.
- **Optional API Key:** To unlock private/pro components, set the environment variable:
  ```powershell
  $env:TWENTYFIRST_API_KEY="your-api-key"
  ```
- **Agent Skill Alternative:** The official `@21st-dev/cli` can also be executed directly via terminal commands (`npx @21st-dev/cli search "card"`).

### 6. Figma MCP (`figma`)
- **How it works:** Connects to Figma's official remote MCP endpoint (`https://mcp.figma.com/mcp`).
- **Activation:** If design files are provided by the client, authenticate using personal access tokens or Figma OAuth via the Antigravity Plugins / Accounts manager.

### 7. Chrome DevTools MCP (`chrome-devtools`)
- **How it works:** Launches a Puppeteer/Chrome DevTools MCP server allowing agents to analyze memory, CPU bottlenecks, and layout shifts (CLS).

---

## 4. Antigravity Refresh / Restart Instructions

To ensure Antigravity loads the newly configured `.agents/mcp_config.json`:
1. Save all open workspace files.
2. In the Antigravity command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`), select **"Reload Window"** or **"Developer: Reload Window"**.
3. Inspect active servers under **Additional Options (...) > MCP Servers** in the Antigravity UI.
