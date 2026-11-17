"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@community/shared";
import { Logo } from "./Logo";
import { IconHome, IconSearch, IconHeart, IconHistory, IconBook, IconDiscord, IconCart, IconUser } from "./icons";

const NAV = [
  { href: "/", label: "Início", icon: IconHome },
  { href: "/pesquisa", label: "Pesquisar", icon: IconSearch },
  { href: "/favoritos", label: "Favoritos", icon: IconHeart },
  { href: "/historico", label: "Histórico", icon: IconHistory },
  { href: "/guias", label: "Guias", icon: IconBook },
  { href: "/suporte", label: "Suporte", icon: IconBook }
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-navy/85 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="Community App — início"><Logo /></Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-600/20 text-white" : "text-muted hover:bg-surface2/60 hover:text-white"
                }`}
              >
                <Icon size={16} /> {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost hidden sm:inline-flex"><IconDiscord size={16} /> <span className="hidden xl:inline">Discord</span></a>
          <a href={BRAND.links.hipobuyInvite} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden sm:inline-flex"><IconCart size={16} /> <span className="hidden md:inline">Criar conta na HipoBuy</span></a>
          <Link href="/login" aria-label="Conta" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface2/60 text-muted hover:text-white"><IconUser size={18} /></Link>
        </div>
      </div>
    </header>
  );
}
