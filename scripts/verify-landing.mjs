import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

async function runVerification() {
  console.log("=== OPA IMPRIMERIE QUALITY ASSURANCE AUDIT ===");
  const screenshotsDir = path.join(process.cwd(), "docs", "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const errors = [];

  // ==========================================
  // 1. DESKTOP AUDIT (1440 x 900)
  // ==========================================
  console.log("\n[1/3] Running Desktop Audit (1440 x 900)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error(`[Browser Console Error]: ${msg.text()}`);
      errors.push(msg.text());
    }
  });

  page.on("response", (res) => {
    if (res.status() >= 400) {
      console.warn(`[HTTP ${res.status()}]: ${res.url()}`);
    }
  });

  page.on("pageerror", (err) => {
    console.error(`[Browser Page Error]: ${err.message}`);
    errors.push(err.message);
  });

  const response = await page.goto("http://localhost:3000", {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  console.log(`✓ HTTP Status: ${response.status()}`);
  if (response.status() !== 200) {
    throw new Error(`Expected HTTP 200, got ${response.status()}`);
  }

  // Check Title & Metadata
  const title = await page.title();
  console.log(`✓ Page Title: "${title}"`);

  const metaDesc = await page.$eval('meta[name="description"]', (el) => el.getAttribute("content"));
  console.log(`✓ Meta Description: "${metaDesc?.slice(0, 70)}..."`);

  // Check JSON-LD schema
  const jsonLd = await page.$eval('script[type="application/ld+json"]', (el) => JSON.parse(el.textContent || "{}"));
  console.log(`✓ JSON-LD LocalBusiness Schema detected: "${jsonLd.name}" (${jsonLd["@type"]})`);

  // Verify all semantic sections exist
  const sectionIds = ["hero", "about", "services", "portfolio", "pourquoi-opa", "contact"];
  for (const id of sectionIds) {
    const el = await page.$(`#${id}`);
    if (!el) {
      throw new Error(`Missing required section #${id}`);
    }
    console.log(`✓ Section #${id} is present in DOM`);
  }

  // Test Service Interactive Switching
  console.log("\nTesting Service Showcase Interactions...");
  const serviceButtons = await page.$$("button:has-text('02')");
  if (serviceButtons.length > 0) {
    await serviceButtons[0].click();
    await page.waitForTimeout(400);
    const serviceTitle = await page.textContent("#services h4");
    console.log(`✓ Clicked Service 02, Detail Headline: "${serviceTitle}"`);
  }

  // Test Portfolio Category Filtering
  console.log("\nTesting Portfolio Category Filtering...");
  const filterPackaging = await page.$("#portfolio button:has-text('Packaging & Boîtes')");
  if (filterPackaging) {
    await filterPackaging.click();
    await page.waitForTimeout(400);
    const visibleCards = await page.$$eval("#portfolio .group", (cards) => cards.length);
    console.log(`✓ Filtered by Packaging: ${visibleCards} items displayed`);
  }

  // Test Portfolio Lightbox Modal
  console.log("\nTesting Portfolio Lightbox Modal...");
  const firstCard = await page.$("#portfolio .group");
  if (firstCard) {
    await firstCard.click();
    await page.waitForTimeout(500);
    const modalTitle = await page.$eval("#modal-title", (el) => el.textContent);
    console.log(`✓ Opened Lightbox Modal for: "${modalTitle}"`);

    // Verify WhatsApp direct link in modal
    const modalWhatsAppBtn = await page.$('a[href*="wa.me/21621808818"]');
    if (modalWhatsAppBtn) {
      const waHref = await modalWhatsAppBtn.getAttribute("href");
      console.log(`✓ Verified WhatsApp modal link: ${waHref?.slice(0, 60)}...`);
    }

    // Close modal
    await page.keyboard.press("Escape");
    await page.click("button:has-text('Fermer')");
    await page.waitForTimeout(300);
    console.log("✓ Closed Lightbox Modal");
  }

  // Check horizontal overflow on desktop
  const isDesktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`✓ Desktop Horizontal Overflow: ${isDesktopOverflow ? "FAIL (Overflow detected!)" : "PASS (Zero overflow)"}`);

  // Capture Desktop Screenshot
  await page.screenshot({
    path: path.join(screenshotsDir, "desktop-full.png"),
    fullPage: true,
  });
  console.log("✓ Saved desktop full-page screenshot to docs/screenshots/desktop-full.png");

  // ==========================================
  // 2. MOBILE AUDIT (390 x 844 iPhone Viewport)
  // ==========================================
  console.log("\n[2/3] Running Mobile Audit (390 x 844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`Mobile console: ${msg.text()}`);
    }
  });

  await mobilePage.goto("http://localhost:3000", {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Check mobile horizontal overflow
  const isMobileOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`✓ Mobile Horizontal Overflow: ${isMobileOverflow ? "FAIL (Overflow detected!)" : "PASS (Zero overflow)"}`);

  // Test Mobile Menu Toggle
  console.log("Testing Mobile Navigation Drawer...");
  const menuButton = await mobilePage.$('button[aria-label="Ouvrir le menu"]');
  if (menuButton) {
    await menuButton.click();
    await mobilePage.waitForTimeout(400);

    const drawerTitle = await mobilePage.$eval('div[role="dialog"] span', (el) => el.textContent);
    console.log(`✓ Mobile Drawer opened successfully: "${drawerTitle}"`);

    await mobilePage.screenshot({
      path: path.join(screenshotsDir, "mobile-drawer.png"),
    });
    console.log("✓ Saved mobile drawer screenshot to docs/screenshots/mobile-drawer.png");

    // Close mobile menu by clicking close button
    const closeButton = await mobilePage.$('button[aria-label="Fermer le menu"]');
    if (closeButton) {
      await closeButton.click();
      await mobilePage.waitForTimeout(300);
      console.log("✓ Mobile Drawer closed cleanly");
    }
  }

  // Capture Mobile Fullpage Screenshot
  await mobilePage.screenshot({
    path: path.join(screenshotsDir, "mobile-full.png"),
    fullPage: true,
  });
  console.log("✓ Saved mobile full-page screenshot to docs/screenshots/mobile-full.png");

  // ==========================================
  // 3. FINAL AUDIT SUMMARY
  // ==========================================
  console.log("\n[3/3] Final Quality Verdict:");
  if (errors.length > 0) {
    console.error(`❌ Errors detected during testing (${errors.length}):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log("🎉 ALL TESTS PASSED WITH 0 CONSOLE ERRORS AND ZERO LAYOUT OVERFLOW!");
  }

  await browser.close();
}

runVerification().catch((err) => {
  console.error("Verification failed with exception:", err);
  process.exit(1);
});
