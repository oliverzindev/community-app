import type { Metadata } from "next";
import { BRAND } from "@community/shared";
import { IconDiscord } from "@/components/icons";

export const metadata: Metadata = { title: "Sobre a comunidade" };

export default function SobrePage() {
  return (
    <div className="container-app max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold text-white">A Community Rep</h1>
      <p className="mt-4 text-muted">
        A Community Rep é uma plataforma independente, feita para a comunidade portuguesa e lusófona que compra em
        marketplaces chineses. Juntamos pesquisa em português, preços em euros e a compra pela HipoBuy num só sítio,
        de forma simples e segura.
      </p>
      <p className="mt-4 text-muted">
        Não contornamos logins, CAPTCHAs nem mecanismos de segurança dos marketplaces. Usamos fontes públicas
        autorizadas e o agente de compras HipoBuy. Quando uma fonte não estiver disponível, dizemo-lo com clareza.
      </p>
      <div className="card mt-8 p-6">
        <h2 className="font-semibold text-ink">Comunidade no Discord</h2>
        <p className="mt-1.5 text-sm text-muted">Tutoriais, entreajuda, novidades e suporte. É onde a comunidade vive.</p>
        <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
          <IconDiscord size={16} /> Entrar na comunidade
        </a>
      </div>
    </div>
  );
}
