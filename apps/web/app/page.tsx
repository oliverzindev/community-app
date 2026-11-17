import Link from "next/link";
import { BRAND, MARKETPLACES } from "@community/shared";
import { HomeSearch } from "@/components/HomeSearch";
import { IconBolt, IconGlobe, IconShield, IconCart, IconDiscord, IconCheck } from "@/components/icons";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-app pt-16 sm:pt-24">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <span className="chip mx-auto mb-5 border-brand-500/40 text-brand-300">
            <IconBolt size={14} /> Para a comunidade lusófona
          </span>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Compra nos marketplaces chineses, <span className="text-brand-400">em português.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted">
            Pesquisa em português, vê fotos e preços em euros, e encomenda através da HipoBuy — sem precisares de conta chinesa.
          </p>
        </div>
        <div className="mx-auto mt-9 max-w-2xl">
          <HomeSearch />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {MARKETPLACES.map((m) => (
              <span key={m.id} className="chip">
                {m.live && <IconCheck size={12} className="text-brand-400" />}
                {m.label}{!m.live && <span className="text-[10px] text-faint">em breve</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="container-app mt-24">
        <h2 className="text-center text-2xl font-bold text-white">Como funciona</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { n: "1", t: "Pesquisa em português", d: "Escreves o que queres. A plataforma traduz para chinês e procura por ti." },
            { n: "2", t: "Vê fotos e preços em €", d: "Resultados com fotografia, preço convertido e informação do vendedor." },
            { n: "3", t: "Compra na HipoBuy", d: "Copia o link e encomenda pela HipoBuy com o convite da comunidade." }
          ].map((s) => (
            <div key={s.n} className="card p-6">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600/20 text-sm font-bold text-brand-300">{s.n}</div>
              <h3 className="mt-4 font-semibold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vantagens */}
      <section className="container-app mt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <IconGlobe size={20} />, t: "Vários marketplaces", d: "Xianyu já disponível. Taobao, 1688, Weidian e JD a caminho, sem reconstruir nada." },
            { icon: <IconShield size={20} />, t: "Sem contornar nada", d: "Nada de burlar logins. Usamos fontes públicas e o agente HipoBuy, de forma legítima." },
            { icon: <IconBolt size={20} />, t: "Tradução e câmbio", d: "Tradução PT↔ZH e conversão CNY→EUR automáticas, com valores aproximados." }
          ].map((f) => (
            <div key={f.t} className="card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-brand-300">{f.icon}</div>
              <h3 className="mt-4 font-semibold text-ink">{f.t}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-app mt-20">
        <div className="card relative overflow-hidden p-8 text-center sm:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/15 to-transparent" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Junta-te à comunidade</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted">Tutoriais, ajuda e novidades no Discord. A compra é feita pela HipoBuy com o convite da comunidade.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/pesquisa" className="btn btn-primary"><IconBolt size={16} /> Pesquisar agora</Link>
              <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><IconDiscord size={16} /> Entrar no Discord</a>
              <a href={BRAND.links.hipobuyInvite} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><IconCart size={16} /> Criar conta HipoBuy</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
