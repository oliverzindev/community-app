import { BRAND } from "@community/shared";
import { IconCart, IconDiscord } from "./icons";
import { MarketLogo } from "./MarketLogo";

/** Ilustração original (SVG) — evita fotografias de produtos com direitos de autor. */
function HeroArt() {
  return (
    <svg viewBox="0 0 420 320" className="h-auto w-full max-w-md" role="img" aria-label="Ilustração de compras internacionais">
      <defs>
        <linearGradient id="h-phone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1D4ED8" /><stop offset="1" stopColor="#0B2140" />
        </linearGradient>
        <radialGradient id="h-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.55" /><stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="230" cy="150" rx="190" ry="150" fill="url(#h-glow)" />
      {/* telemóvel estilizado */}
      <g transform="rotate(-8 230 160)">
        <rect x="168" y="48" width="130" height="224" rx="26" fill="url(#h-phone)" stroke="#3B82F6" strokeWidth="2" />
        <rect x="180" y="64" width="106" height="150" rx="12" fill="#0A1A36" />
        {/* "resultados" dentro do ecrã */}
        <rect x="190" y="74" width="86" height="12" rx="6" fill="#17315C" />
        <rect x="190" y="94" width="40" height="40" rx="8" fill="#13294f" />
        <rect x="236" y="94" width="40" height="40" rx="8" fill="#13294f" />
        <rect x="190" y="142" width="40" height="40" rx="8" fill="#13294f" />
        <rect x="236" y="142" width="40" height="40" rx="8" fill="#13294f" />
        <rect x="190" y="226" width="106" height="30" rx="10" fill="#2563EB" />
        <circle cx="233" cy="241" r="4" fill="#EFF6FF" />
      </g>
      {/* selos de marketplaces a "flutuar" */}
      <g transform="translate(96 70)"><rect x="-10" y="-10" width="44" height="44" rx="12" fill="#0B2140" stroke="#17315C" /></g>
      <g transform="translate(300 96)"><rect x="-10" y="-10" width="44" height="44" rx="12" fill="#0B2140" stroke="#17315C" /></g>
      <g transform="translate(92 210)"><rect x="-10" y="-10" width="44" height="44" rx="12" fill="#0B2140" stroke="#17315C" /></g>
      <text x="100" y="98" fontSize="22" fontWeight="bold" fill="#F6C915">闲</text>
      <text x="304" y="124" fontSize="18" fontWeight="bold" fill="#FF5000">淘</text>
      <text x="90" y="238" fontSize="14" fontWeight="bold" fill="#D7141A">JD</text>
      <text x="60" y="150" fontSize="22" fill="#60A5FA">€</text>
      <text x="340" y="210" fontSize="22" fill="#34d399">✓</text>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface2/70 via-navy to-navy p-6 sm:p-10">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(600px_300px_at_80%_-10%,rgba(37,99,235,0.25),transparent)]" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Encontra. Compara. <span className="text-brand-400">Compra.</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            Pesquisa produtos no Xianyu, Taobao, 1688, Weidian e JD, com tradução automática, conversão de preços e
            compra pela HipoBuy, tudo num só lugar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={BRAND.links.hipobuyInvite} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><IconCart size={16} /> Criar conta na HipoBuy</a>
            <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><IconDiscord size={16} /> Entrar no Discord</a>
          </div>
        </div>
        <div className="relative flex items-center justify-center gap-4">
          <HeroArt />
          <div className="hidden flex-col gap-3 sm:flex">
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
