import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, CircleCheck, Compass, Gauge, Handshake, LockKeyhole, MessageCircle, Ship, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLink, GlobalBand, RouteGraphic, SectionTitle } from "@/components/global-comex-site";
import heroImage from "@/assets/global-comex-hero.jpg";
import shipImage from "@/assets/global-comex-ship.jpg";
import airImage from "@/assets/global-comex-air-cargo.jpg";
import multimodalImage from "@/assets/global-comex-multimodal.jpg";
import coverImage from "@/assets/global-comex-cover-home.jpg.asset.json";
import truckImage from "@/assets/caminhao-containers.png.asset.json";
import securityImage from "@/assets/seguranca-corporativa.png.asset.json";
import serviceImage from "@/assets/atendimento-aperto-de-maos.png.asset.json";
import agilityImage from "@/assets/agilidade-navio-aviao.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Global Comex | Assessoria Aduaneira e Logística Internacional" },
    { name: "description", content: "Assessoria aduaneira, agenciamento de cargas e transporte rodoviário para operações de comércio exterior." },
    { property: "og:title", content: "Global Comex | Assessoria Aduaneira" },
    { property: "og:description", content: "Mais de 30 anos de experiência em assessoria aduaneira e comércio exterior, com agilidade e confiança." },
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
    { n: "01", title: "Assessoria Aduaneira", image: heroImage, icon: Compass },
    { n: "02", title: "Agenciamento de Cargas", image: shipImage, icon: Ship },
    { n: "03", title: "Transporte Rodoviário", image: multimodalImage, icon: Truck },
  ];
  const reviews = [
    ["Advancis Max", "Ficamos extremamente satisfeitos com a agilidade no processo, o profissionalismo em nos atender sempre prontamente e também em nos instruir durante o processo. Somos gratos e indicamos!"],
    ["Daniela Gimenez", "Excelente.. Problema resolvido, profissional atencioso."],
    ["Alan Alves", "A Global Comex cuida do desalfandegamento dos nossos envios de vinho para o Brasil, sempre com muita atenção e qualidade. Rapidez e clareza nas respostas. Recomendo vivamente os serviços deles."],
    ["SMG Automation", "Estamos muito satisfeitos com o atendimento que o Roberto e sua equipe vem prestando a SMG. Tivemos problemas no passado com alguns despachantes mas agora estamos bem seguros. A Global facilita e vem facilitando nossas importações."],
    ["Chapulim Colorado", "Uma excelente empresa de assessoria em processos para exportação. Uma equipe com larga experiência e muita disposição para executar, explicar e até de ensinar os mínimos detalhes do processo de exportação."],
    ["Adriano vargas", "A Selotech Vedações tem muito orgulho em poder contar com a parceria e o suporte da Global Comex. Graças e este suporte temos conseguido vencer vários desafios e temos crescido a taxas maiores que as do mercado. Parabéns Francisco e Roberto. Vocês fazem a diferença. Keep Going!!!"],
    ["Cristina Miyuki", "Parabéns ao Roberto, o Francisco e toda a equipe da GLOBAL COMEX pelo suporte que dá a RESOL sempre que precisamos, desde a elaboração da invoice, packing list, conferência e documentos necessários para enviar ao cliente e para liberação na..."],
    ["Oscar Magalhães", "Fui muito bem atendido pelo srs. Roberto e Francisco. Me ajudaram até em coisas que não eram de suas responsabilidades. Muito prestativos e atentos em todo processo de desembaraço de minha mercadoria. Empresa altamente recomendada."],
  ];
  return (
    <>
      <section className="home-cover" aria-label="Capa Global Comex">
        <img
          src={coverImage.url}
          alt="Global Comex — Assessoria Aduaneira"
          className="cover-image"
          width={1920}
          height={1080}
          loading="eager"
        />
        <div className="cover-overlay" />
        <div className="site-container relative z-10 flex min-h-[100svh] flex-col items-center justify-end pb-24 pt-32 text-center translate-y-[1cm] md:pb-32">
          <h2 className="font-display text-5xl font-semibold text-on-dark sm:text-7xl lg:text-[6.5rem]">{"\n"}</h2>
          <p className="mt-5 max-w-2xl text-[1.2rem] leading-7 text-on-dark-muted md:text-[1.35rem] translate-x-[50mm]">Conectando seus negócios ao mundo, com agilidade e confiança.</p>
        </div>
      </section>

      <section className="home-hero">
        <img src={heroImage} alt="Navio de contêineres em operação portuária internacional" className="hero-image" width={1920} height={1088} />
        <div className="hero-overlay" /><RouteGraphic />
        <div className="site-container relative z-10 flex min-h-[92svh] items-end pb-20 pt-32 md:pb-24">
          <div className="max-w-4xl">
            <div className="section-kicker section-kicker-light hero-sequence">Comércio exterior</div>
            <h1 className="hero-sequence mt-5 font-display text-5xl font-semibold leading-[.94] text-on-dark sm:text-7xl lg:text-[6.5rem]">Assessoria<br /><span>Aduaneira.</span></h1>
            <p className="hero-sequence mt-6 max-w-xl text-base leading-7 text-on-dark-muted md:text-lg">Conectando seus negócios ao mundo, com agilidade e confiança.</p>
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
            <SectionTitle eyebrow="Soluções integradas" title="Assessoria para o seu comércio exterior." description="Conhecimento e acompanhamento para tornar o seu processo mais seguro, ágil e eficiente." />
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
            <div className="value-panel" role="tabpanel"><Sparkles /><p>{values[activeValue]?.text ?? "Ser uma referência em qualidade e eficiência, sempre valorizando o nosso maior patrimônio: o CLIENTE."}</p></div>
            <ArrowLink to="/quem-somos">Conheça nossa história</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-deep text-on-dark">
        <div className="site-container">
          <SectionTitle eyebrow="Por que a Global Comex" title="Precisão em cada movimento." description="Experiência prática para cuidar dos detalhes, antecipar caminhos e acompanhar sua operação." light />
          <div className="benefit-line mt-14">
            {[
              { n: "01", title: "Redução de Custos:\u00a0 \u00a0 Identificamos as melhores rotas, minimizando gastos.", Icon: Gauge, image: truckImage, imageAlt: "Caminhão de carga em terminal de contêineres" },
              { n: "02", title: "Agilidade:\u00a0 \u00a0 Processos eficientes garantem liberação rápida de mercadorias.", Icon: ArrowRight, image: agilityImage, imageAlt: "Navio porta-contêineres e aeronave em operação logística internacional" },
              { n: "03", title: "Segurança:\u00a0 \u00a0 Equipe experiente garante conformidade com normas.", Icon: LockKeyhole, image: securityImage, imageAlt: "Equipe em reunião corporativa de planejamento e conformidade" },
              { n: "04", title: "Atendimento Personalizado:\u00a0 \u00a0Soluções sob medida para cada cliente.", Icon: Handshake, image: serviceImage, imageAlt: "Aperto de mãos em reunião de atendimento personalizado" },
            ].map(({ n, title, Icon, image, imageAlt }) => (
              <article className={`benefit-item ${image ? "benefit-item-with-image" : ""}`} key={title}>
                <div><span>{n}</span><Icon /></div>
                {image && <img src={image.url} alt={imageAlt ?? ""} className="benefit-item-image" width={800} height={450} loading="lazy" />}
                <h3>{title}</h3>
                <CircleCheck />
              </article>
            ))}
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
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]"><SectionTitle eyebrow="Atualizações" title="Informação que move decisões." /><ArrowLink to="/blog">Central de atualizações</ArrowLink></div>
          <div className="blog-preview mt-12">
            <Link to="/blog" search={{ categoria: "Todos" }} className="blog-preview-article"><img src={shipImage} alt="Navio de carga no porto" width={1024} height={1280} loading="lazy" /><div><span>12 FEV 2025</span><h3>Como funciona o transporte de carga consolidada?</h3><ArrowRight /></div></Link>
            <Link to="/blog" search={{ categoria: "Todos" }} className="blog-preview-article"><img src={airImage} alt="Operação de transporte aéreo de cargas" width={1024} height={1280} loading="lazy" /><div><span>12 FEV 2025</span><h3>Logística do transporte aéreo</h3><ArrowRight /></div></Link>
          </div>
        </div>
      </section>

      <section className="contact-cta"><RouteGraphic /><div className="site-container relative z-10 grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-end"><SectionTitle eyebrow="Próximo destino" title="Sua operação pode ir mais longe." description="Converse com a nossa equipe sobre as necessidades do seu processo." light /><div className="flex flex-col items-start gap-4 md:items-end"><Button asChild variant="action" size="xl"><a href="/contato">SOLICITE UMA COTAÇÃO <ArrowRight /></a></Button><a href="https://wa.me/5511971027563" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm font-bold text-on-dark transition-opacity hover:opacity-80" aria-label="Conversar pelo WhatsApp no número (11) 97102-7563"><MessageCircle className="size-5 text-brand-red" /><span><span className="block text-xs uppercase text-on-dark-muted">WhatsApp</span>(11) 97102-7563</span></a></div></div></section>
    </>
  );
}
