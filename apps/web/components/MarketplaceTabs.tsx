"use client";
import { MARKETPLACES, type MarketplaceId } from "@community/shared";
import { MarketLogo } from "./MarketLogo";

export function MarketplaceTabs({
  value,
  onChange
}: {
  value: MarketplaceId | "all";
  onChange: (v: MarketplaceId | "all") => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onChange("all")}
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
          value === "all" ? "border-brand-500 bg-brand-600/20 text-white" : "border-line bg-surface2/50 text-muted hover:text-white"
        }`}
      >
        <span className="grid h-5 w-5 place-items-center rounded-md bg-brand-600/30 text-[11px]">▦</span> Todos
      </button>
      {MARKETPLACES.map((m) => (
        <button
          key={m.id}
          onClick={() => m.live && onChange(m.id)}
          disabled={!m.live}
          title={m.note}
          className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
            value === m.id ? "border-brand-500 bg-brand-600/20 text-white" : "border-line bg-surface2/50 text-muted"
          } ${m.live ? "hover:text-white" : "cursor-not-allowed opacity-50"}`}
        >
          <MarketLogo id={m.id} size={20} /> {m.label}
          {!m.live && <span className="rounded-full bg-navy/60 px-1.5 py-0.5 text-[9px] font-medium text-faint">em breve</span>}
        </button>
      ))}
    </div>
  );
}
