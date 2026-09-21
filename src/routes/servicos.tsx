import { createFileRoute } from "@tanstack/react-router";
import { Anchor, ArrowUpRight, FileSearch, Truck } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/global-comex-site";
import shipImage from "@/assets/global-comex-ship.jpg";
import airImage from "@/assets/global-comex-air-cargo.jpg";
import multimodalImage from "@/assets/global-comex-multimodal.jpg";

export const Route = createFileRoute("/servicos")({ head: () => ({ meta: [
  { title: "Serviços | Global Comex" }, { name: "description", content: "Assessoria aduaneira, agenciamento de cargas e transporte rodoviário para operações de comércio exterior." },
  { property: "og:title", content: "Serviços | Global Comex" }, { property: "og:description", content: "Soluções para os fluxos do comércio exterior e logística internacional." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: Servicos });

const serviceList = [
  ["01","Assessoria Aduaneira",FileSearch,shipImage], ["02","Agenciamento de Cargas",Anchor,airImage], ["03","Transporte Rodoviário",Truck,multimodalImage],
] as const;

function Servicos(){return <><PageHero eyebrow="Serviços" title="Assessoria que conecta sua operação." description="Conhecimento e acompanhamento para processos aduaneiros e movimentos logísticos."/><section className="section-space"><div className="site-container"><SectionTitle eyebrow="Atuação integrada" title="Assessoria Aduaneira como ponto central." description="Três frentes de serviço conectadas pela mesma atenção aos detalhes e ao fluxo da sua carga."/><div className="services-grid mt-14">{serviceList.map(([n,title,Icon,image])=><article className="service-detail" key={title}><img src={image} alt="" loading="lazy"/><div className="service-detail-overlay"/><div className="service-detail-top"><span>{n}</span><Icon/></div><div className="service-detail-bottom"><h2>{title}</h2><ArrowUpRight/></div></article>)}</div></div></section></>}