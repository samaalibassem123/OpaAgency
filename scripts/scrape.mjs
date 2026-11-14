import { chromium } from "@playwright/test";

async function run() {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto("https://unsplash.com/s/photos/luxury-packaging", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(3000);
  const srcs = await p.evaluate(() => {
    return Array.from(document.querySelectorAll("img")).map(i => i.src);
  });
  console.log("All image URLs count:", srcs.length);
  console.log("Sample image URLs:", srcs.slice(0, 10));
  await b.close();
}
run();
