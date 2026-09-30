import { readFile, writeFile } from "node:fs/promises";
import { fetchTradeNews, type TradeNewsItem } from "../src/lib/trade-news-feed";

const destination = new URL("../src/data/trade-news.snapshot.json", import.meta.url);
let previous: { items: TradeNewsItem[]; updatedAt: string } = { items: [], updatedAt: "" };
try {
  previous = JSON.parse(await readFile(destination, "utf8"));
} catch {
  // First build: there is no saved snapshot yet.
}
const latest = await fetchTradeNews();
// Keep the last verified snapshot if every official feed is unavailable.
if (!latest.items.length && !previous.items.length) {
  throw new Error("No official news available and no previous snapshot to preserve.");
}
if (latest.items.length) {
  await writeFile(destination, `${JSON.stringify({ items: latest.items, updatedAt: new Date().toISOString() }, null, 2)}\n`);
  console.log(`Saved ${latest.items.length} official updates.`);
} else {
  console.log("Feeds unavailable; retaining last verified snapshot.");
}
