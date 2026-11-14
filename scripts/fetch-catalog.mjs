import https from "https";
import fs from "fs";
import path from "path";

const images = [
  { name: "test-1.jpg", id: "photo-1584917865442-de89df76afd3" },
  { name: "test-2.jpg", id: "photo-1547887537-6158d64c35b3" },
  { name: "test-3.jpg", id: "photo-1509198397868-475647b2a1e5" },
  { name: "test-4.jpg", id: "photo-1607604276583-eef5d076aa5f" },
  { name: "test-5.jpg", id: "photo-1586075010923-2dd4570fb338" },
  { name: "test-6.jpg", id: "photo-1544716278-ca5e3f4abd8c" },
  { name: "test-7.jpg", id: "photo-1512820790803-83ca734da794" },
  { name: "test-8.jpg", id: "photo-1513519245088-0e12902e5a38" },
  { name: "test-9.jpg", id: "photo-1544816155-12df9643f363" },
  { name: "test-10.jpg", id: "photo-1589939705384-5185137a7f0f" },
  { name: "test-11.jpg", id: "photo-1616401784845-180882ba9ba8" },
  { name: "test-12.jpg", id: "photo-1528740561666-dc2479dc08ab" },
];

const dir = path.join(process.cwd(), "public", "images", "catalog");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadOne(item) {
  return new Promise((resolve) => {
    const dest = path.join(dir, item.name);
    const file = fs.createWriteStream(dest);
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&q=80&w=800`;
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
    }).on("error", resolve);
  });
}

async function main() {
  for (const item of images) {
    await downloadOne(item);
    console.log(`Saved ${item.name}`);
  }
}
main();
