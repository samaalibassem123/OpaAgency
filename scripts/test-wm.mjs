import https from "https";
import fs from "fs";
import path from "path";

const urls = [
  { name: "unsplash-box-1.jpg", url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48" }, // old pink
  { name: "unsplash-box-50wT.jpg", url: "https://source.unsplash.com/50wT_eW52a4" },
  { name: "wm-heidelberg.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Original_Heidelberg_Platen_Press.jpg/1280px-Original_Heidelberg_Platen_Press.jpg" },
  { name: "wm-offset.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Printing_press_komori.jpg/1280px-Printing_press_komori.jpg" },
  { name: "wm-types.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Letterpress_metal_type.jpg/1280px-Letterpress_metal_type.jpg" },
];

async function checkUrl(item) {
  return new Promise((resolve) => {
    https.get(item.url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      console.log(`[${res.statusCode}] ${item.name}`);
      resolve();
    }).on("error", (e) => {
      console.log(`[ERR] ${item.name}: ${e.message}`);
      resolve();
    });
  });
}

for (const u of urls) {
  await checkUrl(u);
}
