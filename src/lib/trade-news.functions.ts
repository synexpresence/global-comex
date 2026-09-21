import { XMLParser } from "fast-xml-parser";
import { createServerFn, setResponseHeader } from "@tanstack/react-start";

export type NewsCategory =
  | "Comércio Exterior"
  | "Importação"
  | "Exportação"
  | "Aduana"
  | "Siscomex"
  | "Legislação e regulamentação";

export type TradeNewsItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  summary: string;
  categories: NewsCategory[];
  url: string;
};

type FeedDefinition = {
  url: string;
  source: string;
  primaryCategory: NewsCategory;
};

const FEEDS: FeedDefinition[] = [
  {
    url: "https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas/informativos/RSS",
    source: "MDIC",
    primaryCategory: "Comércio Exterior",
  },
  {
    url: "https://www.gov.br/siscomex/pt-br/noticias/noticias-siscomex-importacao/noticias-siscomex-importacao/RSS",
    source: "Siscomex",
    primaryCategory: "Importação",
  },
  {
    url: "https://www.gov.br/siscomex/pt-br/noticias/noticias-siscomex-exportacao/noticias-siscomex-exportacao/RSS",
    source: "Siscomex",
    primaryCategory: "Exportação",
  },
  {
    url: "https://www.gov.br/siscomex/pt-br/noticias/noticias-siscomex-sistemas/noticias-siscomex-sistemas/RSS",
    source: "Siscomex",
    primaryCategory: "Siscomex",
  },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  trimValues: true,
  processEntities: true,
});

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function plainText(value: unknown, limit: number): string {
  if (typeof value !== "string") return "";
  const text = value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  const shortened = text.slice(0, limit + 1).replace(/\s+\S*$/, "").trim();
  return `${shortened}…`;
}

function safeOfficialUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    const officialPath =
      url.hostname === "www.gov.br" &&
      (url.pathname.startsWith("/mdic/") || url.pathname.startsWith("/siscomex/"));
    if (url.protocol !== "https:" || !officialPath) return undefined;
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function categoriesFor(
  primaryCategory: NewsCategory,
  title: string,
  summary: string,
): NewsCategory[] {
  const categories = new Set<NewsCategory>([primaryCategory]);
  const content = `${title} ${summary}`.toLocaleLowerCase("pt-BR");
  if (/aduan|desembaraço|alfândega|recinto alfandegado/.test(content)) categories.add("Aduana");
  if (/siscomex|duimp|du-e|portal único|sistema/.test(content)) categories.add("Siscomex");
  if (/lei|decreto|portaria|instrução normativa|regulament|norma|resolução|medida provisória/.test(content)) {
    categories.add("Legislação e regulamentação");
  }
  if (/importaç|importador/.test(content)) categories.add("Importação");
  if (/exportaç|exportador/.test(content)) categories.add("Exportação");
  return [...categories];
}

async function fetchFeed(feed: FeedDefinition): Promise<TradeNewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(feed.url, {
      headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Feed returned ${response.status}`);
    const xml = await response.text();
    if (xml.length > 2_000_000) throw new Error("Feed exceeded size limit");

    const parsed = parser.parse(xml) as {
      "rdf:RDF"?: { item?: Array<Record<string, unknown>> | Record<string, unknown> };
      rss?: { channel?: { item?: Array<Record<string, unknown>> | Record<string, unknown> } };
      feed?: { entry?: Array<Record<string, unknown>> | Record<string, unknown> };
    };
    const rawItems = [
      ...asArray(parsed["rdf:RDF"]?.item),
      ...asArray(parsed.rss?.channel?.item),
      ...asArray(parsed.feed?.entry),
    ];

    return rawItems.flatMap((item) => {
      const title = plainText(item.title, 180);
      const summary = plainText(item.description ?? item.summary ?? item.content, 240);
      const linkValue = typeof item.link === "object" && item.link !== null
        ? (item.link as Record<string, unknown>)["@_href"]
        : item.link;
      const url = safeOfficialUrl(linkValue);
      const rawDate = item["dc:date"] ?? item.pubDate ?? item.updated ?? item.published;
      const date = typeof rawDate === "string" ? new Date(rawDate) : undefined;
      if (!title || !summary || !url || !date || Number.isNaN(date.getTime())) return [];

      return [{
        id: url,
        title,
        source: feed.source,
        publishedAt: date.toISOString(),
        summary,
        categories: categoriesFor(feed.primaryCategory, title, summary),
        url,
      }];
    });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeTitle(title: string): string {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const getTradeNews = createServerFn({ method: "GET" }).handler(async () => {
  setResponseHeader("Cache-Control", "public, max-age=900, stale-while-revalidate=21600");
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const items = results
    .flatMap((result) => result.status === "fulfilled" ? result.value : [])
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .filter((item) => {
      const titleKey = normalizeTitle(item.title);
      if (seenUrls.has(item.url) || seenTitles.has(titleKey)) return false;
      seenUrls.add(item.url);
      seenTitles.add(titleKey);
      return true;
    })
    .slice(0, 30);

  return { items };
});