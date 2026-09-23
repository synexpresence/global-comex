import { createFileRoute } from "@tanstack/react-router";
import { Compass, FileCheck2, Route as RouteIcon } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/global-comex-site";
import bannerImage from "@/assets/banner-global-comex.png.asset.json";
import shipImage from "@/assets/global-comex-ship.jpg";
import documentImage from "@/assets/orientacao-documental.png.asset.json";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({ meta: [
    { title: "Quem Somos | Global Comex" }, { name: "description", content: "Conheça a experiência e o compromisso da Global Comex com o comércio exterior." },
    { property: "og:title", content: "Quem Somos | Global Comex" }, { property: "og:description", content: "Mais de 30 anos de experiência no segmento de comércio exterior." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: QuemSomos,
});

function QuemSomos() {
  return <>
    <PageHero eyebrow="Quem somos" title="Experiência em Assessoria Aduaneira." description="Profissionais experientes e atenção às etapas do despacho aduaneiro e do comércio exterior." />
    <section className="section-space"><div className="site-container grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      <div><SectionTitle eyebrow="Global Comex" title="Juntos em busca do sucesso" /><div className="institutional-copy"><p>A GLOBAL COMEX ASSESSORIA ADUANEIRA LTDA surgiu através de colaboradores que atuam há mais de 30 anos no segmento de Comércio Exterior, desde o momento de coleta da mercadoria junto ao fornecedor até a entrega em território nacional.</p><p>Assessoramos nos processos aduaneiros, garantindo segurança e tranquilidade, elaborando estudos de viabilidade, planilhas de custos estimativos e identificando as melhores rotas e opções de transporte com o intuito de reduzir custos e agilizar processos.</p><p>Auxiliamos na classificação tarifária e instruímos clientes na emissão de documentos. Contamos com profissionais experientes que buscam soluções e aperfeiçoamento do fluxo de todas as etapas do Despacho Aduaneiro.</p></div></div>
      <div className="relative min-h-[600px] overflow-hidden"><img src={shipImage} alt="Navio porta-contêineres em operação" className="size-full object-cover" width={1024} height={1280} /><div className="experience-stamp"><strong>30+</strong><span>anos de<br />experiência</span></div></div>
    </div></section>
    <section className="section-space bg-surface-soft"><div className="site-container"><SectionTitle eyebrow="Como trabalhamos" title="Conhecimento aplicado à Assessoria Aduaneira." /><div className="process-grid mt-12">{[[Compass,"Melhores rotas","Identificação de rotas e opções de transporte."],[FileCheck2,"Orientação documental","Apoio na classificação tarifária e emissão de documentos."],[RouteIcon,"Fluxo acompanhado","Atenção às etapas do despacho aduaneiro."]].map(([Icon,title,text]) => { const I=Icon as typeof Compass; const image = title === "Melhores rotas" ? bannerImage : title === "Orientação documental" ? documentImage : undefined; return <article key={title as string}>{image && <img src={image.url} alt={title === "Melhores rotas" ? "Operação logística da Global Comex com transporte terrestre, marítimo e aéreo" : "Profissional acompanhando informações de comércio internacional"} className="process-card-image" loading="lazy" />}<I/><span>0{[["Melhores rotas"],["Orientação documental"],["Fluxo acompanhado"]].findIndex(x=>x[0]===title)+1}</span><h3>{title as string}</h3><p>{text as string}</p></article>;})}</div></div></section>
  </>;
}