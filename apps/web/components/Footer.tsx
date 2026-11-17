import Link from "next/link";
import { BRAND } from "@community/shared";
import { Logo } from "./Logo";
import { IconDiscord } from "./icons";

const COLS = [
  { h: "Plataforma", links: [["/sobre", "Sobre a Community App"], ["/", "Como funciona"], ["/guias", "Guias e tutoriais"]] },
  { h: "Compras", links: [["/como-comprar", "Comprar na HipoBuy"], ["/como-comprar", "Taxas e envios"], ["/guias", "Dicas de compra"]] },
  { h: "Comunidade", links: [[BRAND.links.discord, "Discord da comunidade"], ["/suporte", "Suporte"], ["/", "Novidades"]] },
  { h: "Legal", links: [["/termos", "Termos de utilização"], ["/privacidade", "Política de privacidade"], ["/privacidade", "Política de cookies"]] }
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line/70 bg-navy/60">
      <div className="container-app grid gap-10 py-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">A tua plataforma de compras internacionais da comunidade.</p>
          <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4"><IconDiscord size={16} /> Entrar na comunidade</a>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">{c.h}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {c.links.map(([href, label], i) => (
                <li key={i}>
                  {href.startsWith("http")
                    ? <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{label}</a>
                    : <Link href={href} className="hover:text-white">{label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line/60">
        <div className="container-app flex flex-col items-center justify-between gap-2 py-5 text-xs text-faint sm:flex-row">
          <span>© {year} Community App. Todos os direitos reservados.</span>
          <span>Preços aproximados. A compra é feita através da HipoBuy.</span>
        </div>
      </div>
    </footer>
  );
}
