import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import https from "https";

const queries = [
  { target: "hero_box", query: "black-luxury-packaging-box-gold" },
  { target: "about_press", query: "letterpress-print-shop" },
  { target: "service_packaging", query: "rigid-box-packaging" },
  { target: "service_edition", query: "book-editorial-design" },
  { target: "service_stationery", query: "black-business-cards-embossed" },
  { target: "service_finishing", query: "hot-foil-stamping" },
  { target: "service_signage", query: "illuminated-architectural-signage" },
  { target: "service_textile", query: "screen-printing-workshop" },
];

async function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.headers.location) {
        https.get(res.headers.location, (r2) => {
          r2.pipe(file);
          file.on("finish", () => { file.close(); resolve(); });
        });
      } else {
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      }
    }).on("error", reject);
  });
}

async function scrapeImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const destDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  for (const q of queries) {
    console.log(`\nSearching for ${q.target} (${q.query})...`);
    await page.goto(`https://unsplash.com/s/photos/${q.query}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const imgUrls = await page.$$eval("figure img", (imgs) =>
      imgs
        .map((img) => img.src)
        .filter((src) => src && src.includes("images.unsplash.com/photo-"))
    );

    if (imgUrls.length > 0) {
      const best = imgUrls[0];
      // Get base photo URL without crop parameters
      const baseUrl = best.split("?")[0] + "?auto=format&fit=crop&q=85&w=1200";
      console.log(`Found: ${baseUrl}`);
      const dest = path.join(destDir, `${q.target}.jpg`);
      await download(baseUrl, dest);
      console.log(`Saved: public/images/${q.target}.jpg`);
    } else {
      console.warn(`No images found for ${q.query}`);
    }
  }

  await browser.close();
}

scrapeImages().catch(console.error);
