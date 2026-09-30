import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { fetchTradeNews } from "./trade-news-feed";
export type { NewsCategory, TradeNewsItem } from "./trade-news-feed";

export const getTradeNews = createServerFn({ method: "GET" }).handler(async () => {
  setResponseHeader("Cache-Control", "public, max-age=900, stale-while-revalidate=21600");
  return fetchTradeNews();
});
