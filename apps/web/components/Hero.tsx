import { BRAND } from "@community/shared";
import { IconCart, IconDiscord, IconSearch } from "./icons";

/** Ilustração original (SVG) — evita fotografias de produtos com direitos de autor. */
function HeroArt() {
  return (
    <svg viewBox="0 0 460 360" className="h-auto w-full max-w-[460px] drop-shadow-[0_30px_60px_rgba(37,99,235,0.35)]" role="img" aria-label="Pesquisa de produtos">
      <defs>
        <linearGradient id="hp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2A5BD7" /><stop offset="1" stopColor="#0A1A36" /></linearGradient>
        <radialGradient id="hg" cx="50%" cy="38%" r="62%"><stop offset="0" stopColor="#2563EB" stopOpacity="0.65" /><stop offset="1" stopColor="#2563EB" stopOpacity="0" /></radialGradient>
        <linearGradient id="hb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3B82F6" /><stop offset="1" stopColor="#2563EB" /></linearGradient>
      </defs>
      <ellipse cx="250" cy="170" rx="210" ry="165" fill="url(#hg)" />
      <g transform="rotate(-7 250 180)">
        {/* corpo do telemóvel */}
        <rect x="176" y="40" width="150" height="268" rx="30" fill="url(#hp)" stroke="#4C86F0" strokeWidth="2" />
        {/* ecrã */}
        <rect x="188" y="58" width="126" height="232" rx="16" fill="#091a37" />
        {/* barra de pesquisa */}
        <rect x="198" y="70" width="106" height="18" rx="9" fill="#13294f" />
        <circle cx="208" cy="79" r="3.2" fill="#60A5FA" />
        {/* grelha de produtos */}
        <g>
          <rect x="198" y="98" width="50" height="62" rx="9" fill="#0f2246" stroke="#1b3b6b" />
          <rect x="256" y="98" width="50" height="62" rx="9" fill="#0f2246" />
          <rect x="198" y="168" width="50" height="62" rx="9" fill="#0f2246" />
          <rect x="256" y="168" width="50" height="62" rx="9" fill="#0f2246" />
          {/* mini imagens + preços */}
          <rect x="204" y="104" width="38" height="34" rx="6" fill="#16305c" />
          <rect x="262" y="104" width="38" height="34" rx="6" fill="#16305c" />
          <rect x="204" y="174" width="38" height="34" rx="6" fill="#16305c" />
          <rect x="262" y="174" width="38" height="34" rx="6" fill="#16305c" />
          <rect x="204" y="143" width="26" height="6" rx="3" fill="#34d399" />
          <rect x="262" y="143" width="26" height="6" rx="3" fill="#34d399" />
          <rect x="204" y="213" width="26" height="6" rx="3" fill="#34d399" />
          <rect x="262" y="213" width="26" height="6" rx="3" fill="#34d399" />
        </g>
        {/* botão comprar */}
        <rect x="198" y="242" width="108" height="34" rx="11" fill="url(#hb)" />
        <circle cx="240" cy="259" r="4" fill="#EFF6FF" />
        <rect x="250" y="256" width="34" height="6" rx="3" fill="#EFF6FF" />
      </g>
      {/* selos de marketplaces a flutuar */}
      <g><rect x="92" y="70" width="46" height="46" rx="13" fill="#0B2140" stroke="#17315C" /><text x="104" y="101" fontSize="22" fontWeight="bold" fill="#F6C915">闲</text></g>
      <g><rect x="330" y="96" width="46" height="46" rx="13" fill="#0B2140" stroke="#17315C" /><text x="340" y="126" fontSize="18" fontWeight="bold" fill="#FF5000">淘</text></g>
      <g><rect x="84" y="214" width="46" height="46" rx="13" fill="#0B2140" stroke="#17315C" /><text x="92" y="243" fontSize="15" fontWeight="bold" fill="#D7141A">JD</text></g>
      <text x="366" y="238" fontSize="24" fill="#34d399">✓</text>
      <text x="58" y="160" fontSize="24" fill="#60A5FA">€</text>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line">
      {/* fundo do banner */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#071A38_0%,#0C2347_45%,#102C52_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(700px_340px_at_82%_-15%,rgba(37,99,235,0.35),transparent)]" />
      <div className="absolute -right-10 top-0 -z-10 h-full w-1/2 bg-[radial-gradient(400px_300px_at_70%_40%,rgba(96,165,250,0.18),transparent)]" />

      <div className="relative grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <span className="chip border-brand-500/40 bg-brand-600/15 text-brand-200">🇵🇹 Para a comunidade lusófona</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Encontra. Compara. <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">Compra.</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-muted sm:text-lg">
            Pesquisa produtos no Xianyu, Taobao, 1688, Weidian e JD, com tradução automática, conversão de preços e
            compra pela HipoBuy, tudo num só lugar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#pesquisar" className="btn btn-primary"><IconSearch size={16} /> Pesquisar agora</a>
            <a href={BRAND.links.hipobuyInvite} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><IconCart size={16} /> Criar conta na HipoBuy</a>
            <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><IconDiscord size={16} /> Discord</a>
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-4">
          <HeroArt />
          <div className="hidden flex-col gap-3 xl:flex">
            <div className="card w-44 p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-ink"><IconCart size={15} className="text-brand-300" /> HipoBuy</div>
              <p className="mt-1 text-xs text-faint">Compra e envio internacional</p>
            </div>
            <div className="card w-44 p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-ink"><IconDiscord size={15} className="text-brand-300" /> Discord</div>
              <p className="mt-1 text-xs text-faint">Comunidade, suporte e novidades</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
