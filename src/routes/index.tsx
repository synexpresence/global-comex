import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, CircleCheck, Compass, Gauge, Handshake, LockKeyhole, Plane, Ship, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLink, GlobalBand, RouteGraphic, SectionTitle } from "@/components/global-comex-site";
import heroImage from "@/assets/global-comex-hero.jpg";
import shipImage from "@/assets/global-comex-ship.jpg";
import airImage from "@/assets/global-comex-air-cargo.jpg";
import multimodalImage from "@/assets/global-comex-multimodal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Global Comex | Assessoria Aduaneira e Logística Internacional" },
    { name: "description", content: "Mais de 30 anos de experiência em assessoria aduaneira, agenciamento de cargas, importação e exportação." },
    { property: "og:title", content: "Global Comex | Comércio exterior com experiência" },
    { property: "og:description", content: "Assessoria aduaneira e logística internacional com segurança, agilidade e atendimento personalizado." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const [activeValue, setActiveValue] = useState(0);
  const values = [
    { label: "Missão", text: "Ser uma referência em qualidade e eficiência, sempre valorizando o nosso maior patrimônio: o CLIENTE." },
    { label: "Visão", text: "Atuar com experiência e aperfeiçoamento contínuo do fluxo de todas as etapas do despacho aduaneiro." },
    { label: "Nosso Foco", text: "Encontrar as melhores rotas e opções de transporte para reduzir custos e agilizar processos." },
  ];
  const services = [
    { n: "01", title: "Agenciamento de Cargas", image: heroImage, icon: Ship },
    { n: "02", title: "Assessoria Aduaneira", image: shipImage, icon: Compass },
    { n: "03", title: "Importação e Exportação", image: airImage, icon: Plane },
  ];
  const reviews = [
    ["Advancis Max", "Ficamos extremamente satisfeitos com a agilidade no processo, o profissionalismo em nos atender sempre prontamente e também em nos instruir durante o processo. Somos gratos e indicamos!"],
    ["Daniela Gimenez", "Excelente.. Problema resolvido, profissional atencioso."],
    ["Alan Alves", "A Global Comex cuida do desalfandegamento dos nossos envios de vinho para o Brasil, sempre com muita atenção e qualidade. Rapidez e clareza nas respostas. Recomendo vivamente os serviços deles."],
  ];
  return (
    <>
      <section className="home-hero">
        <img src={heroImage} alt="Navio de contêineres em operação portuária internacional" className="hero-image" width={1920} height={1088} />
        <div className="hero-overlay" /><RouteGraphic />
        <div className="site-container relative z-10 flex min-h-[92svh] items-end pb-20 pt-32 md:pb-24">
          <div className="max-w-4xl">
            <div className="section-kicker section-kicker-light hero-sequence">Logística sem fronteiras</div>
            <h1 className="hero-sequence mt-5 font-display text-5xl font-semibold leading-[.94] text-on-dark sm:text-7xl lg:text-[6.5rem]">Agenciamento<br /><span>de Cargas.</span></h1>
            <p className="hero-sequence mt-6 max-w-xl text-base leading-7 text-on-dark-muted md:text-lg">Experiência e precisão conectando sua empresa ao comércio internacional.</p>
            <Button asChild variant="action" size="xl" className="hero-sequence mt-8">
              <a href="#servicos-destaque">SAIBA MAIS <ArrowDown /></a>
            </Button>
          </div>
        </div>
        <div className="hero-coordinates">23°32' S · 46°32' W <span>GLOBAL COMEX</span></div>
      </section>
      <GlobalBand />

      <section id="servicos-destaque" className="section-space bg-background">
        <div className="site-container">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <SectionTitle eyebrow="Soluções integradas" title="Movemos negócios por terra, mar e ar." description="Atuação em todas as etapas para tornar o seu processo mais seguro, ágil e eficiente." />
            <ArrowLink to="/servicos">Conheça todos os serviços</ArrowLink>
          </div>
          <div className="service-showcase mt-12">
            {services.map(({ n, title, image, icon: Icon }, index) => (
              <article className={`service-panel ${index === 0 ? "service-panel-wide" : ""}`} key={title}>
                <img src={image} alt="" width={index === 0 ? 1920 : 1024} height={index === 0 ? 1088 : 1280} loading="lazy" />
                <div className="service-shade" />
                <div className="service-content"><span>{n}</span><Icon /><h3>{title}</h3><ArrowRight /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section">
        <div className="site-container grid items-stretch lg:grid-cols-[.9fr_1.1fr]">
          <div className="experience-number"><span>Mais de</span><strong>30<sup>+</sup></strong><p>anos de experiência<br />no comércio exterior</p></div>
          <div className="relative min-h-[420px] overflow-hidden"><img src={multimodalImage} alt="Integração entre transporte terrestre, marítimo e aéreo" className="size-full object-cover" width={1600} height={912} loading="lazy" /><div className="image-blue-overlay" /></div>
        </div>
      </section>

      <section className="section-space bg-surface-soft">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-sm"><img src={shipImage} alt="Navio porta-contêineres em rota internacional" className="size-full object-cover transition-transform duration-700 hover:scale-105" width={1024} height={1280} loading="lazy" /><div className="image-caption">Conexões construídas com experiência</div></div>
          <div>
            <SectionTitle eyebrow="Nossa essência" title="Juntos em busca do sucesso" description="Acompanhamos o processo desde a coleta da mercadoria junto ao fornecedor até a entrega em território nacional." />
            <div className="mt-9 flex border-b border-border" role="tablist" aria-label="Valores da Global Comex">
              {values.map((item, index) => <button key={item.label} role="tab" aria-selected={activeValue === index} className={`value-tab ${activeValue === index ? "value-tab-active" : ""}`} onClick={() => setActiveValue(index)}>{item.label}</button>)}
            </div>
            <div className="value-panel" role="tabpanel"><Sparkles /><p>{values[activeValue]?.text ?? values[0].text}</p></div>
            <ArrowLink to="/quem-somos">Conheça nossa história</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-deep text-on-dark">
        <div className="site-container">
          <SectionTitle eyebrow="Por que a Global Comex" title="Precisão em cada movimento." description="Experiência prática para cuidar dos detalhes, antecipar caminhos e acompanhar sua operação." light />
          <div className="benefit-line mt-14">
            {[
              ["01", "Redução de Custos", Gauge], ["02", "Agilidade", ArrowRight], ["03", "Segurança", LockKeyhole], ["04", "Atendimento Personalizado", Handshake],
            ].map(([n, title, Icon]) => { const BenefitIcon = Icon as typeof Gauge; return <article className="benefit-item" key={title as string}><div><span>{n as string}</span><BenefitIcon /></div><h3>{title as string}</h3><CircleCheck /></article>; })}
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="site-container">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]"><SectionTitle eyebrow="5,0 estrelas · 34 avaliações no Google" title="Quem confia, recomenda." /><a className="arrow-link" href="https://www.google.com/search?q=Global+Comex+Assessoria+Aduaneira" target="_blank" rel="noreferrer">Ver avaliações no Google <ArrowRight /></a></div>
          <div className="review-grid mt-12">{reviews.map(([name, text]) => <article className="review-card" key={name}><div className="flex gap-1 text-brand-red" aria-label="5 estrelas">{[0,1,2,3,4].map((star) => <Star key={star} fill="currentColor" />)}</div><blockquote>“{text}”</blockquote><p>{name}</p></article>)}</div>
        </div>
      </section>

      <section className="section-space bg-surface-soft">
        <div className="site-container">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]"><SectionTitle eyebrow="Conteúdo" title="Informação que move decisões." /><ArrowLink to="/blog">Acessar o blog</ArrowLink></div>
          <div className="blog-preview mt-12">
            <article><img src={shipImage} alt="Navio de carga no porto" width={1024} height={1280} loading="lazy" /><div><span>12 FEV 2025</span><h3>Como funciona o transporte de carga consolidada?</h3><ArrowRight /></div></article>
            <article><img src={airImage} alt="Operação de transporte aéreo de cargas" width={1024} height={1280} loading="lazy" /><div><span>12 FEV 2025</span><h3>Logística do transporte aéreo</h3><ArrowRight /></div></article>
          </div>
        </div>
      </section>

      <section className="contact-cta"><RouteGraphic /><div className="site-container relative z-10 grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-end"><SectionTitle eyebrow="Próximo destino" title="Sua operação pode ir mais longe." description="Converse com a nossa equipe sobre as necessidades do seu processo." light /><Button asChild variant="action" size="xl"><a href="/contato">SOLICITE UMA COTAÇÃO <ArrowRight /></a></Button></div></section>
    </>
  );
}
