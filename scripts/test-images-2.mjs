import https from "https";

const list = [
  "photo-1512909006721-3d6018887383", // luxury gift box
  "photo-1584917865442-de89df76afd3", // luxury black bag/box
  "photo-1523275335684-37898b6baf30", // luxury watch box / packaging
  "photo-1526170375885-4d8ecf77b99f", // polaroid / print craft
  "photo-1547887537-6158d64c35b3", // dark luxury craft
  "photo-1586075010923-2dd4570fb338", // paper sheet / stationery
  "photo-1607604276583-eef5d076aa5f", // business cards stack
  "photo-1618005182384-a83a8bd57fbe", // abstract fluid gold & obsidian
  "photo-1513519245088-0e12902e5a38", // gold signage / illuminated
  "photo-1544716278-ca5e3f4abd8c", // open bound book
  "photo-1512820790803-83ca734da794", // bound books spine
  "photo-1544816155-12df9643f363", // tote bag
  "photo-1509198397868-475647b2a1e5", // metallic foil detail
  "photo-1572021335469-31706a17aaef", // studio portrait / creative director
  "photo-1581091226825-a6a2a5aee158", // craftsman hands / engineering
  "photo-1563986768609-322da13575f3", // offset / tech machinery
];

async function check(id) {
  return new Promise((res) => {
    https.get(`https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=400`, (r) => {
      console.log(`[${r.statusCode}] ${id}`);
      res();
    }).on("error", () => res());
  });
}

for (const id of list) {
  await check(id);
}
