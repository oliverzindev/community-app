import type { Metadata } from "next";
import { BRAND } from "@community/shared";
import { IconDiscord } from "@/components/icons";

export const metadata: Metadata = { title: "Suporte" };

export default function SuportePage() {
  return (
    <div className="container-app max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold text-white">Suporte</h1>
      <p className="mt-3 text-muted">Precisas de ajuda? O caminho mais rápido é o Discord da comunidade.</p>
      <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
        <IconDiscord size={16} /> Pedir ajuda no Discord
      </a>
      <div className="mt-10 space-y-4">
        {[
          { q: "Preciso de conta no Xianyu?", a: "Não. Pesquisas na Community App e compras pela HipoBuy, que usa a conta deles." },
          { q: "Os preços são exatos?", a: "São aproximados (câmbio automático). Não incluem portes nem a taxa do agente." },
          { q: "Porque é que alguns marketplaces dizem 'em breve'?", a: "Só ativamos cada marketplace quando há uma fonte pública ou API autorizada. Começámos pelo Xianyu." }
        ].map((f) => (
          <div key={f.q} className="card p-5">
            <h3 className="font-semibold text-ink">{f.q}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
