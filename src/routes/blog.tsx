import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionTitle } from "@/components/global-comex-site";
import shipImage from "@/assets/global-comex-ship.jpg";
import airImage from "@/assets/global-comex-air-cargo.jpg";

export const Route=createFileRoute("/blog")({head:()=>({meta:[
  {title:"Blog | Global Comex"},{name:"description",content:"Conteúdos da Global Comex sobre transporte de cargas e logística internacional."},
  {property:"og:title",content:"Blog | Global Comex"},{property:"og:description",content:"Informação para apoiar decisões em comércio exterior."},
  {property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"},
]}),component:Blog});
function Blog(){return <><PageHero eyebrow="Blog" title="Conhecimento que atravessa fronteiras." description="Conteúdos sobre os movimentos e processos da logística internacional."/><section className="section-space"><div className="site-container"><SectionTitle eyebrow="Publicações" title="Informação para mover decisões."/><div className="editorial-grid mt-12"><article><img src={shipImage} alt="Navio de carga" width={1024} height={1280}/><div><span>12 de fevereiro de 2025</span><h2>Como funciona o transporte de carga consolidada?</h2><ArrowUpRight/></div></article><article><img src={airImage} alt="Carga em aeronave" width={1024} height={1280}/><div><span>12 de fevereiro de 2025</span><h2>Logística do transporte aéreo</h2><ArrowUpRight/></div></article></div></div></section></>}