/** Logótipo original da Community Rep: glifo (lupa + nós de comunidade) + wordmark. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ca-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#0B2140" stroke="#1D4ED8" strokeWidth="1.5" />
      {/* lupa */}
      <circle cx="21" cy="21" r="9.5" stroke="url(#ca-g)" strokeWidth="3" fill="none" />
      <line x1="28" y1="28" x2="36" y2="36" stroke="url(#ca-g)" strokeWidth="3.4" strokeLinecap="round" />
      {/* nós de comunidade dentro da lupa */}
      <circle cx="21" cy="16.5" r="2.1" fill="#EFF6FF" />
      <circle cx="16.8" cy="24" r="2.1" fill="#93C5FD" />
      <circle cx="25.2" cy="24" r="2.1" fill="#93C5FD" />
      <path d="M21 16.5 16.8 24M21 16.5 25.2 24M16.8 24h8.4" stroke="#3B82F6" strokeWidth="1.3" />
    </svg>
  );
}

export function Logo({ size = 32, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-extrabold tracking-tight text-ink">Community Rep</span>
          <span className="text-[10px] font-medium text-faint">pesquisa &amp; compras</span>
        </span>
      )}
    </span>
  );
}
