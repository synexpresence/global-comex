import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/global-comex-site";
import { Button } from "@/components/ui/button";
import { getTradeNews, type NewsCategory, type TradeNewsItem } from "@/lib/trade-news.functions";
import shipImage from "@/assets/global-comex-ship.jpg";
import airImage from "@/assets/global-comex-air-cargo.jpg";

const categories = [
  "Todos",
  "Comércio Exterior",
  "Importação",
  "Exportação",
  "Aduana",
  "Siscomex",
  "Legislação e regulamentação",
] as const;

type CategoryFilter = (typeof categories)[number];

const newsQueryOptions = queryOptions({
  queryKey: ["trade-news"],
  queryFn: () => getTradeNews(),
  staleTime: 15 * 60 * 1_000,
});

export const Route = createFileRoute("/blog")({
  validateSearch: (search: Record<string, unknown>) => ({
    categoria: categories.includes(search["categoria"] as CategoryFilter)
      ? search["categoria"] as CategoryFilter
      : "Todos" as CategoryFilter,
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(newsQueryOptions),
  head: () => ({ meta: [
    { title: "Central de Atualizações do Comércio Exterior | Global Comex" },
    { name: "description", content: "Notícias e atualizações oficiais sobre comércio exterior, importação, exportação, aduana e Siscomex." },
    { property: "og:title", content: "Central de Atualizações do Comércio Exterior | Global Comex" },
    { property: "og:description", content: "Acompanhe notícias e comunicados de fontes oficiais relevantes para o comércio exterior." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  errorComponent: PreviousContentPage,
  notFoundComponent: PreviousContentPage,
  component: UpdatesCenter,
});

function UpdatesCenter() {
  const { data } = useSuspenseQuery(newsQueryOptions);
  const { categoria } = Route.useSearch();
  const navigate = useNavigate({ from: "/blog" });
  const availableCategories = categories.filter((category) =>
    category === "Todos" || data.items.some((item) => item.categories.includes(category as NewsCategory)),
  );
  const visibleItems = categoria === "Todos"
    ? data.items
    : data.items.filter((item) => item.categories.includes(categoria));
  const featured = visibleItems[0];
  const remaining = visibleItems.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Atualizações oficiais"
        title="Central de Atualizações do Comércio Exterior."
        description="Notícias e comunicados de fontes oficiais para acompanhar os movimentos que impactam o comércio exterior."
      />

      <section className="updates-section section-space bg-background">
        <div className="site-container">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionTitle
              eyebrow="Últimas atualizações"
              title="Informação confiável, direto da fonte."
              description="Acesse resumos objetivos e siga para a publicação original para consultar o conteúdo completo."
            />
            {data.items.length > 0 && (
              <p className="updates-source-note"><span />Fontes oficiais: MDIC e Siscomex</p>
            )}
          </div>

          {data.items.length > 0 ? (
            <>
              <div className="updates-filters mt-10" aria-label="Filtrar atualizações">
                {availableCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    size="sm"
                    variant={categoria === category ? "default" : "outline"}
                    aria-pressed={categoria === category}
                    onClick={() => navigate({ search: { categoria: category }, replace: true })}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {featured ? (
                <>
                  <FeaturedUpdate item={featured} />
                  {remaining.length > 0 && (
                    <div className="updates-grid mt-4">
                      {remaining.map((item, index) => <UpdateCard key={item.id} item={item} index={index} />)}
                    </div>
                  )}
                </>
              ) : (
                <div className="updates-empty"><Newspaper /><p>Nenhuma atualização disponível nesta categoria.</p></div>
              )}
            </>
          ) : (
            <div className="updates-unavailable mt-12">
              <Newspaper />
              <div><h2>Atualizações oficiais temporariamente indisponíveis.</h2><p>Enquanto isso, consulte os conteúdos anteriores da Global Comex abaixo.</p></div>
            </div>
          )}
        </div>
      </section>

      <PreviousContent />
    </>
  );
}

function FeaturedUpdate({ item }: { item: TradeNewsItem }) {
  return (
    <article className="update-featured mt-12">
      <div className="update-route" aria-hidden="true"><span /><span /><span /></div>
      <div className="relative z-10">
        <UpdateMeta item={item} />
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <a href={item.url} target="_blank" rel="noopener noreferrer">Ler notícia completa <ArrowUpRight /></a>
      </div>
    </article>
  );
}

function UpdateCard({ item, index }: { item: TradeNewsItem; index: number }) {
  return (
    <article className={`update-card ${index % 5 === 0 ? "update-card-wide" : ""}`}>
      <UpdateMeta item={item} />
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer">Ler notícia completa <ArrowUpRight /></a>
    </article>
  );
}

function UpdateMeta({ item }: { item: TradeNewsItem }) {
  return (
    <div className="update-meta">
      <strong>{item.source}</strong>
      <span>{item.categories[0]}</span>
      <time dateTime={item.publishedAt}><CalendarDays />{formatDate(item.publishedAt)}</time>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

function PreviousContentPage() {
  return <><PageHero eyebrow="Conteúdos" title="Central de Atualizações do Comércio Exterior." description="Informação para apoiar decisões no comércio exterior." /><PreviousContent /></>;
}

function PreviousContent() {
  return (
    <section className="section-space bg-surface-soft">
      <div className="site-container">
        <SectionTitle eyebrow="Arquivo Global Comex" title="Conteúdos anteriores." />
        <div className="editorial-grid mt-12">
          <article><img src={shipImage} alt="Navio de carga" width={1024} height={1280} loading="lazy" /><div><span>12 de fevereiro de 2025</span><h2>Como funciona o transporte de carga consolidada?</h2><ArrowRight /></div></article>
          <article><img src={airImage} alt="Carga em aeronave" width={1024} height={1280} loading="lazy" /><div><span>12 de fevereiro de 2025</span><h2>Logística do transporte aéreo</h2><ArrowRight /></div></article>
        </div>
      </div>
    </section>
  );
}