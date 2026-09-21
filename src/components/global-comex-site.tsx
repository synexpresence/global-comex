import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/global-comex-logo-oficial.png.asset.json";

export const contact = {
  phone: "+55 11 2364-2167",
  whatsapp: "+55 11 97102-7563",
  email: "francisco@global-comex.com",
  address: "R. Itinguçu, 895 - Sl 02 - Vila Ré, São Paulo - SP, 03658-010, Brasil",
};

const navigation = [
  { label: "Home", to: "/" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Serviços", to: "/servicos" },
  { label: "Atualizações", to: "/blog" },
  { label: "Contato", to: "/contato" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${isHome ? "site-header-home" : ""} ${scrolled || open ? "site-header-solid" : ""}`}>
      <div className="site-container flex h-[76px] items-center justify-between gap-5 lg:h-[88px]">
        <Link to="/" aria-label="Global Comex — página inicial" className="shrink-0">
          <img src={logoAsset.url} alt="Global Comex Assessoria Aduaneira" className="brand-logo" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ className: "nav-link nav-link-active" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 text-xs font-bold text-header sm:flex" aria-label="Idioma">
            <span className="text-current">PT</span><span className="opacity-50">/</span><span className="opacity-60">EN</span>
          </div>
          <Button asChild variant="header" size="sm" className="header-cta hidden lg:inline-flex">
            <Link to="/contato">SOLICITE UMA COTAÇÃO</Link>
          </Button>
          <Button
            type="button"
            variant="headerGhost"
            size="icon"
            className="header-menu-toggle min-h-11 min-w-11 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu lg:hidden" aria-label="Navegação para celular">
          {navigation.map((item, index) => (
            <Link key={item.to} to={item.to} className="mobile-link">
              <span>0{index + 1}</span>{item.label}<ChevronRight />
            </Link>
          ))}
          <div className="flex gap-2 pt-4 text-sm font-bold"><span>PT</span><span className="opacity-50">EN</span></div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-on-dark">
      <div className="site-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_1fr_1.25fr]">
        <div>
          <img src={logoAsset.url} alt="Global Comex" className="footer-logo" loading="lazy" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-on-dark-muted">
            Assessoria aduaneira e logística internacional com experiência, segurança e atenção em cada etapa.
          </p>
        </div>
        <FooterColumn title="Navegação" links={navigation} />
        <FooterColumn title="Serviços" links={[
          { label: "Assessoria Aduaneira", to: "/servicos" },
          { label: "Agenciamento de Cargas", to: "/servicos" },
          { label: "Transporte Rodoviário", to: "/servicos" },
        ]} />
        <div>
          <p className="footer-title">Contato</p>
          <div className="mt-5 space-y-4 text-sm text-on-dark-muted">
            <a className="footer-contact" href="tel:+551123642167"><Phone />{contact.phone}</a>
            <a className="footer-contact" href="mailto:francisco@global-comex.com"><Mail />{contact.email}</a>
            <p className="footer-contact"><MapPin />{contact.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-on-dark-muted sm:flex-row sm:justify-between">
          <span>© Global Comex Assessoria Aduaneira Ltda.</span>
          <span>Desenvolvido por Publicomex</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<{ label: string; to: "/" | "/quem-somos" | "/servicos" | "/blog" | "/contato" }> }) {
  return <div><p className="footer-title">{title}</p><div className="mt-5 flex flex-col gap-3">{links.map((link) => <Link key={`${link.to}-${link.label}`} to={link.to} className="footer-link">{link.label}</Link>)}</div></div>;
}

export function WhatsAppButton() {
  return (
    <a className="whatsapp-button" href="https://wa.me/5511971027563" target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp">
      <MessageCircle /><span>WhatsApp</span>
    </a>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-hero">
      <RouteGraphic />
      <div className="site-container relative z-10 pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="section-kicker section-kicker-light animate-fade-in">{eyebrow}</div>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.06] text-on-dark sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-on-dark-muted md:text-lg">{description}</p>
      </div>
    </section>
  );
}

export function RouteGraphic() {
  return (
    <div className="route-graphic" aria-hidden="true">
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none">
        <path d="M-20 330 C 180 90, 350 370, 520 165 S 820 120, 1040 30" />
        <circle cx="166" cy="184" r="5" /><circle cx="518" cy="166" r="5" /><circle cx="842" cy="94" r="5" />
      </svg>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <div className={`section-kicker ${light ? "section-kicker-light" : ""}`}>{eyebrow}</div>
      <h2 className={`mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${light ? "text-on-dark" : "text-foreground"}`}>{title}</h2>
      {description && <p className={`mt-5 max-w-2xl leading-7 ${light ? "text-on-dark-muted" : "text-muted-foreground"}`}>{description}</p>}
    </div>
  );
}

export function ArrowLink({ to, children, light = false }: { to: "/" | "/quem-somos" | "/servicos" | "/blog" | "/contato"; children: ReactNode; light?: boolean }) {
  return <Link to={to} className={`arrow-link ${light ? "arrow-link-light" : ""}`}>{children}<ArrowRight /></Link>;
}

export function GlobalBand() {
  return (
    <div className="global-band" aria-label="Atuação em comércio exterior">
      <div className="site-container flex items-center gap-5 overflow-hidden py-4 text-xs font-bold uppercase text-on-dark-muted">
        <Globe2 className="shrink-0 text-brand-red" />
        <div className="flex min-w-max items-center gap-8"><span>Comércio exterior</span><i /> <span>Logística internacional</span><i /><span>Assessoria aduaneira</span><i /><span>Conexões que movimentam negócios</span></div>
      </div>
    </div>
  );
}