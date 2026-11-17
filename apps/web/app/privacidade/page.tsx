import type { Metadata } from "next";
export const metadata: Metadata = { title: "Política de privacidade" };

export default function PrivacidadePage() {
  return (
    <div className="container-app max-w-3xl py-12 prose-invert">
      <h1 className="text-3xl font-extrabold text-white">Política de privacidade</h1>
      <p className="mt-3 text-sm text-faint">Rascunho — a rever antes da publicação pública.</p>
      <div className="mt-6 space-y-5 text-muted">
        <section><h2 className="font-semibold text-ink">Dados que tratamos</h2><p className="mt-1.5 text-sm">Com conta: email e preferências. Favoritos e histórico de pesquisas ficam associados à tua conta (ou no teu dispositivo, se não tiveres conta). Não guardamos cookies nem credenciais dos marketplaces.</p></section>
        <section><h2 className="font-semibold text-ink">Serviços externos</h2><p className="mt-1.5 text-sm">Para pesquisar, enviamos apenas o termo de pesquisa a fornecedores de dados e de tradução. As fotos são carregadas dos CDN dos marketplaces. A compra é feita na HipoBuy, sujeita à política deles.</p></section>
        <section><h2 className="font-semibold text-ink">RGPD</h2><p className="mt-1.5 text-sm">Podes pedir acesso, correção ou eliminação dos teus dados. Alojamento em região da UE.</p></section>
        <section><h2 className="font-semibold text-ink">Contacto</h2><p className="mt-1.5 text-sm">Através do Discord da comunidade.</p></section>
      </div>
    </div>
  );
}
