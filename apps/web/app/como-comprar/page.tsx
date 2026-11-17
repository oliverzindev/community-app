import type { Metadata } from "next";
import { BRAND } from "@community/shared";
import { IconCart, IconCheck } from "@/components/icons";

export const metadata: Metadata = { title: "Como comprar na HipoBuy" };

const steps = [
  { t: "Pesquisa o produto", d: "Na Community Rep, escreve em português e encontra o artigo que queres." },
  { t: "Copia o link", d: "No cartão do produto, carrega em HipoBuy (copia o link original) ou em Copiar link." },
  { t: "Abre a HipoBuy", d: "Cria conta com o convite da comunidade (uma só vez) e cola o link no campo de encomenda." },
  { t: "Confirma e paga", d: "A HipoBuy compra ao vendedor, recebe no armazém, tira fotos (QC) e envia para ti." }
];

export default function ComoComprarPage() {
  return (
    <div className="container-app max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold text-white">Como comprar na HipoBuy</h1>
      <p className="mt-3 text-muted">
        A HipoBuy é um agente de compras: compra por ti nos marketplaces chineses com a conta deles e envia para Portugal. Assim não precisas de conta chinesa.
      </p>
      <a href={BRAND.links.hipobuyInvite} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
        <IconCart size={16} /> Criar conta na HipoBuy
      </a>

      <ol className="mt-10 space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="card flex gap-4 p-5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-600/20 text-sm font-bold text-brand-300">{i + 1}</span>
            <div>
              <h3 className="font-semibold text-ink">{s.t}</h3>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="card mt-8 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-ink"><IconCheck size={18} className="text-brand-400" /> Bom saber</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>Os preços na Community Rep são aproximados e não incluem portes nem a taxa de serviço do agente.</li>
          <li>Os links apontam sempre para o anúncio original — não alteramos identificadores de produto.</li>
          <li>Confirma sempre o artigo com o vendedor (fotos/vídeo) antes de comprar.</li>
        </ul>
      </div>
    </div>
  );
}
