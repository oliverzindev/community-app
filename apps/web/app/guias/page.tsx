import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@community/shared";
import { IconBook, IconCart, IconSearch, IconDiscord } from "@/components/icons";

export const metadata: Metadata = { title: "Guias e tutoriais" };

const guides = [
  { icon: <IconSearch size={18} />, t: "Como pesquisar bem", d: "Usa palavras simples em português. A plataforma traduz para chinês. Para marcas, escreve o nome em inglês." },
  { icon: <IconCart size={18} />, t: "Comprar na HipoBuy", d: "Copia o link do produto, cola no Custom Order / Fill and Buy da HipoBuy e confirma a encomenda.", href: "/como-comprar" },
  { icon: <IconBook size={18} />, t: "Preços e taxas", d: "O preço em euros é aproximado (câmbio do BCE). Não inclui portes internacionais nem a taxa de serviço do agente." },
  { icon: <IconDiscord size={18} />, t: "Ajuda da comunidade", d: "Dúvidas, QC e novidades no Discord da comunidade.", href: BRAND.links.discord }
];

export default function GuiasPage() {
  return (
    <div className="container-app max-w-4xl py-12">
      <h1 className="flex items-center gap-2 text-3xl font-extrabold text-white"><IconBook size={24} /> Guias e tutoriais</h1>
      <p className="mt-3 text-muted">Tudo o que precisas para comprar nos marketplaces chineses sem complicações.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <div key={g.t} className="card p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface2 text-brand-300">{g.icon}</div>
            <h3 className="mt-3 font-semibold text-ink">{g.t}</h3>
            <p className="mt-1.5 text-sm text-muted">{g.d}</p>
            {g.href && (
              g.href.startsWith("http")
                ? <a href={g.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 text-sm">Abrir</a>
                : <Link href={g.href} className="btn btn-ghost mt-3 text-sm">Abrir</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
