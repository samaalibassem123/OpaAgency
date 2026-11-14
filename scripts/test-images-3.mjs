import https from "https";

const list = [
  "photo-1589939705384-5185137a7f0f",
  "photo-1516962215378-7fa2e137ae93",
  "photo-1616401784845-180882ba9ba8",
  "photo-1528740561666-dc2479dc08ab",
  "photo-1586495777744-4413f21062fa",
  "photo-1505740420928-5e560c06d30e",
  "photo-1531306728370-e2ebd9d7bb99",
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
