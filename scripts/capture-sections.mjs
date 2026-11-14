import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

async function capture() {
  const dir = path.join(process.cwd(), "docs", "screenshots", "sections");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const sections = ["hero", "about", "services", "portfolio", "pourquoi-opa", "contact"];
  for (const s of sections) {
    const el = await page.$(`#${s}`);
    if (el) {
      await el.screenshot({ path: path.join(dir, `desktop-${s}.png`) });
      console.log(`Saved desktop-${s}.png`);
    }
  }

  // Footer
  const footer = await page.$("footer");
  if (footer) {
    await footer.screenshot({ path: path.join(dir, `desktop-footer.png`) });
    console.log(`Saved desktop-footer.png`);
  }

  // Mobile
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  for (const s of sections) {
    const el = await mobilePage.$(`#${s}`);
    if (el) {
      await el.screenshot({ path: path.join(dir, `mobile-${s}.png`) });
      console.log(`Saved mobile-${s}.png`);
    }
  }

  const mobileFooter = await mobilePage.$("footer");
  if (mobileFooter) {
    await mobileFooter.screenshot({ path: path.join(dir, `mobile-footer.png`) });
    console.log(`Saved mobile-footer.png`);
  }

  await browser.close();
}

capture().catch(console.error);
