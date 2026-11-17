import Link from "next/link";
import { BRAND } from "@community/shared";
import { Logo } from "./Logo";
import { IconDiscord } from "./icons";

const NAV = [
  { href: "/pesquisa", label: "Pesquisar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/como-comprar", label: "Como comprar" },
  { href: "/sobre", label: "Comunidade" }
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-navy/80 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Community App — início">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface2/60 hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost hidden sm:inline-flex" aria-label="Discord">
            <IconDiscord size={16} /> <span className="hidden lg:inline">Discord</span>
          </a>
          <Link href="/login" className="btn btn-ghost">Entrar</Link>
          <Link href="/pesquisa" className="btn btn-primary">Começar</Link>
        </div>
      </div>
    </header>
  );
}
