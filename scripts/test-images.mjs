import https from "https";

const candidateImages = [
  // Luxury dark packaging / boxes / foil
  { key: "hero_box", id: "photo-1549465220-1a8b9238cd48" }, // old (pink)
  { key: "luxury_black_box_1", id: "photo-1512909006721-3d6018887383" },
  { key: "luxury_black_box_2", id: "photo-1584917865442-de89df76afd3" },
  { key: "luxury_perfume_box", id: "photo-1592945403244-b3fbafd7f539" },
  { key: "letterpress_cards_1", id: "photo-1589330694653-dad6bc0140af" }, // check if working
  { key: "letterpress_cards_2", id: "photo-1586075010923-2dd4570fb338" },
  { key: "business_cards_dark", id: "photo-1594913785162-e678a0c23ddb" },
  { key: "business_cards_3", id: "photo-1607604276583-eef5d076aa5f" },
  { key: "editorial_book_1", id: "photo-1544716278-ca5e3f4abd8c" },
  { key: "editorial_book_2", id: "photo-1512820790803-83ca734da794" },
  { key: "gold_foil_macro", id: "photo-1509198397868-475647b2a1e5" },
  { key: "printing_press", id: "photo-1563986768609-322da13575f3" },
  { key: "paper_craft_hands", id: "photo-1581091226825-a6a2a5aee158" },
  { key: "architectural_signage", id: "photo-1513519245088-0e12902e5a38" },
  { key: "textile_tote", id: "photo-1544816155-12df9643f363" },
];

async function checkUrl(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&q=80&w=800`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`[${res.statusCode}] ${item.key}: ${item.id}`);
      resolve({ key: item.key, id: item.id, status: res.statusCode });
    }).on("error", (e) => {
      console.log(`[ERR] ${item.key}: ${e.message}`);
      resolve({ key: item.key, id: item.id, status: 500 });
    });
  });
}

async function run() {
  for (const item of candidateImages) {
    await checkUrl(item);
  }
}
run();
