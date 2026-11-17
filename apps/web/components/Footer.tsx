import Link from "next/link";
import { BRAND } from "@community/shared";
import { Logo } from "./Logo";
import { IconDiscord } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line/70 bg-navy/60">
      <div className="container-app grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">{BRAND.description}</p>
          <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4">
            <IconDiscord size={16} /> Entrar na comunidade
          </a>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">Plataforma</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/pesquisa" className="hover:text-white">Pesquisar</Link></li>
            <li><Link href="/favoritos" className="hover:text-white">Favoritos</Link></li>
            <li><Link href="/como-comprar" className="hover:text-white">Como comprar na HipoBuy</Link></li>
            <li><Link href="/suporte" className="hover:text-white">Suporte</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
            <li><Link href="/privacidade" className="hover:text-white">Privacidade</Link></li>
            <li><Link href="/termos" className="hover:text-white">Termos</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="container-app flex flex-col items-center justify-between gap-2 py-5 text-xs text-faint sm:flex-row">
          <span>© {year} Community App. Plataforma independente para a comunidade lusófona.</span>
          <span>Preços aproximados. A compra é feita através da HipoBuy.</span>
        </div>
      </div>
    </footer>
  );
}
