import { chromium } from "@playwright/test";

async function find() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://unsplash.com/s/photos/luxury-packaging-box", { waitUntil: "networkidle" });
  
  const urls = await page.$$eval("img", imgs => imgs.map(i => i.src).filter(s => s && s.includes("images.unsplash.com/photo-")));
  console.log("Found URLs:", urls.slice(0, 5));
  await browser.close();
}
find();
