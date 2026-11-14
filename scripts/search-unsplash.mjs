import https from "https";

async function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
  const options = {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  };
  return new Promise((resolve) => {
    https.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const results = json.results.map((r) => ({
            id: r.id,
            description: r.alt_description || r.description,
            url: r.urls.regular,
          }));
          resolve(results);
        } catch (e) {
          console.error("Parse error for", query, e.message);
          resolve([]);
        }
      });
    }).on("error", (e) => {
      console.error("Network error for", query, e.message);
      resolve([]);
    });
  });
}

async function run() {
  const queries = [
    "luxury packaging box black gold",
    "letterpress printing press",
    "embossed business cards",
    "book binding hardcover",
    "storefront signage",
    "screen printing t shirt",
  ];

  for (const q of queries) {
    console.log(`\n=== QUERY: ${q} ===`);
    const results = await searchUnsplash(q);
    for (const r of results) {
      console.log(`- ID: ${r.id} | Desc: ${r.description}`);
      console.log(`  URL: ${r.url}`);
    }
  }
}

run();
