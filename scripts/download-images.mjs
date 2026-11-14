import https from "https";
import fs from "fs";
import path from "path";

const imagesToDownload = [
  { name: "hero-luxury-box.jpg", id: "photo-1586495777744-4413f21062fa" },
  { name: "about-printing-press.jpg", id: "photo-1563986768609-322da13575f3" },
  { name: "service-packaging.jpg", id: "photo-1584917865442-de89df76afd3" },
  { name: "service-edition.jpg", id: "photo-1544716278-ca5e3f4abd8c" },
  { name: "service-stationery.jpg", id: "photo-1607604276583-eef5d076aa5f" },
  { name: "service-finishing.jpg", id: "photo-1509198397868-475647b2a1e5" },
  { name: "service-signage.jpg", id: "photo-1513519245088-0e12902e5a38" },
  { name: "service-textile.jpg", id: "photo-1544816155-12df9643f363" },
  { name: "portfolio-perfume-box.jpg", id: "photo-1592945403244-b3fbafd7f539" },
  { name: "portfolio-cards-duplex.jpg", id: "photo-1586075010923-2dd4570fb338" },
  { name: "portfolio-annual-book.jpg", id: "photo-1512820790803-83ca734da794" },
  { name: "portfolio-cosmetic-folding.jpg", id: "photo-1522335789203-aabd1fc54bc9" },
  { name: "portfolio-folder-diecut.jpg", id: "photo-1544716278-ca5e3f4abd8c" },
  { name: "portfolio-signage-dibond.jpg", id: "photo-1513519245088-0e12902e5a38" },
];

const destDir = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function download(item) {
  return new Promise((resolve) => {
    const filePath = path.join(destDir, item.name);
    const file = fs.createWriteStream(filePath);
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&q=85&w=1200`;

    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`Downloaded ${item.name}`);
            resolve();
          });
        });
      } else {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded ${item.name}`);
          resolve();
        });
      }
    }).on("error", (err) => {
      console.error(`Error downloading ${item.name}:`, err);
      resolve();
    });
  });
}

async function run() {
  for (const item of imagesToDownload) {
    await download(item);
  }
}
run();
