import type { Metadata } from "next";
export const metadata: Metadata = { title: "Termos de utilização" };

export default function TermosPage() {
  return (
    <div className="container-app max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold text-white">Termos de utilização</h1>
      <p className="mt-3 text-sm text-faint">Rascunho — a rever antes da publicação pública.</p>
      <div className="mt-6 space-y-5 text-muted">
        <section><h2 className="font-semibold text-ink">O serviço</h2><p className="mt-1.5 text-sm">A Community Rep é uma ferramenta de pesquisa e encaminhamento para agentes de compra. Não vende produtos nem processa pagamentos. A compra, o envio e os litígios são da responsabilidade do agente (HipoBuy) e do vendedor.</p></section>
        <section><h2 className="font-semibold text-ink">Preços e informação</h2><p className="mt-1.5 text-sm">Os preços e a informação dos produtos são aproximados e provêm de fontes de terceiros. Podem conter erros ou estar desatualizados.</p></section>
        <section><h2 className="font-semibold text-ink">Uso aceitável</h2><p className="mt-1.5 text-sm">Não é permitido usar a plataforma para fins ilícitos nem contornar mecanismos de segurança de terceiros.</p></section>
        <section><h2 className="font-semibold text-ink">Alterações</h2><p className="mt-1.5 text-sm">Estes termos podem ser atualizados. A utilização continuada implica aceitação.</p></section>
      </div>
    </div>
  );
}
