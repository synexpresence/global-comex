import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, contact } from "@/components/global-comex-site";

export const Route=createFileRoute("/contato")({head:()=>({meta:[
  {title:"Contato | Global Comex"},{name:"description",content:"Fale com a Global Comex sobre sua operação de comércio exterior e logística."},
  {property:"og:title",content:"Contato | Global Comex"},{property:"og:description",content:"Entre em contato para conversar sobre sua operação."},
  {property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"},
]}),component:Contato});
function Contato(){
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("https://formspree.io/f/xqpajyza", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Formspree rejected the submission");
      form.reset();
      setStatus("success");
      setMessage("Mensagem enviada com sucesso. Obrigado pelo contato!");
    } catch {
      setStatus("error");
      setMessage("Não foi possível enviar sua mensagem. Tente novamente.");
    }
  }
  return <><PageHero eyebrow="Contato" title="Vamos traçar a melhor rota juntos." description="Fale com a nossa equipe e apresente as necessidades da sua operação."/><section className="section-space"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
  <div><p className="section-kicker">Fale conosco</p><h2 className="mt-4 font-display text-3xl font-semibold">Sua operação começa com uma boa conversa.</h2><div className="contact-list"><a href="tel:+551123642167"><Phone/><span>Telefone<strong>{contact.phone}</strong></span></a><a href="https://wa.me/5511971027563" target="_blank" rel="noreferrer"><MessageCircle/><span>WhatsApp<strong>{contact.whatsapp}</strong></span></a><a href="mailto:francisco@global-comex.com"><Mail/><span>E-mail<strong>{contact.email}</strong></span></a><div><MapPin/><span>Endereço<strong>{contact.address}</strong></span></div></div></div>
  <form className="contact-form" action="https://formspree.io/f/xqpajyza" method="POST" onSubmit={handleSubmit}><div className="form-grid"><label>Nome<input required name="nome" placeholder="Seu nome"/></label><label>Empresa<input name="empresa" placeholder="Sua empresa"/></label><label>E-mail<input required type="email" name="email" placeholder="voce@empresa.com"/></label><label>Telefone<input name="telefone" placeholder="(00) 00000-0000"/></label></div><label>Mensagem<textarea required name="mensagem" rows={6} placeholder="Conte sobre sua operação"/></label><Button type="submit" variant="action" size="xl" disabled={status === "sending"}>{status === "sending" ? "ENVIANDO..." : "ENVIAR MENSAGEM"} <Send/></Button>{message&&<p className="form-notice" role={status === "error" ? "alert" : "status"}>{message}</p>}</form>
  </div><div className="site-container mt-16"><iframe className="map-frame" title="Mapa da Global Comex" loading="lazy" src="https://www.google.com/maps?q=R.%20Itingu%C3%A7u%2C%20895%20-%20Vila%20R%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP&output=embed"/></div></section></>}