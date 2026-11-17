"use client";
import { MARKETPLACES, type MarketplaceId } from "@community/shared";
import { MarketLogo } from "./MarketLogo";

export type Conditions = { novo: boolean; usado: boolean; inspecao: boolean };
export interface FilterState {
  priceMin: string;
  priceMax: string;
  marketplaces: Record<MarketplaceId, boolean>;
  conditions: Conditions;
}

export function emptyFilters(): FilterState {
  return {
    priceMin: "",
    priceMax: "",
    marketplaces: { xianyu: true, taobao: false, e1688: false, weidian: false, jd: false },
    conditions: { novo: false, usado: false, inspecao: false }
  };
}

const CONDS: { key: keyof Conditions; label: string }[] = [
  { key: "novo", label: "Novo" },
  { key: "usado", label: "Usado" },
  { key: "inspecao", label: "Com inspeção" }
];

export function Filters({
  value,
  counts,
  onChange,
  onApply
}: {
  value: FilterState;
  counts: Partial<Record<MarketplaceId, number>>;
  onChange: (f: FilterState) => void;
  onApply: () => void;
}) {
  return (
    <aside className="card h-max p-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
        <span className="text-brand-300">⇅</span> Filtros
      </h3>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-faint">Preço (EUR)</p>
        <div className="mt-2 flex gap-2">
          <input
            inputMode="decimal"
            value={value.priceMin}
            onChange={(e) => onChange({ ...value, priceMin: e.target.value })}
            placeholder="€ Mín."
            className="input py-2 text-sm"
          />
          <input
            inputMode="decimal"
            value={value.priceMax}
            onChange={(e) => onChange({ ...value, priceMax: e.target.value })}
            placeholder="€ Máx."
            className="input py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-faint">Marketplace</p>
        <div className="mt-2 space-y-1">
          {MARKETPLACES.map((m) => (
            <label
              key={m.id}
              className={`flex items-center justify-between rounded-lg px-1.5 py-1.5 ${m.live ? "cursor-pointer hover:bg-surface2/50" : "opacity-50"}`}
            >
              <span className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  disabled={!m.live}
                  checked={value.marketplaces[m.id]}
                  onChange={(e) => onChange({ ...value, marketplaces: { ...value.marketplaces, [m.id]: e.target.checked } })}
                  className="h-4 w-4 accent-royal"
                />
                <MarketLogo id={m.id} size={18} /> {m.label}
              </span>
              <span className="text-xs text-faint">{m.live ? counts[m.id] ?? "" : "em breve"}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-faint">Estado</p>
        <div className="mt-2 space-y-1">
          {CONDS.map((c) => (
            <label key={c.key} className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1.5 text-sm hover:bg-surface2/50">
              <input
                type="checkbox"
                checked={value.conditions[c.key]}
                onChange={(e) => onChange({ ...value, conditions: { ...value.conditions, [c.key]: e.target.checked } })}
                className="h-4 w-4 accent-royal"
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      <button onClick={onApply} className="btn btn-primary btn-block mt-5 w-full">⇅ Aplicar filtros</button>
    </aside>
  );
}

/** Deteção best-effort do estado a partir do texto do anúncio. */
export function conditionOf(text: string): keyof Conditions | null {
  const t = text.toLowerCase();
  if (/inspe|验货|verifica/.test(t)) return "inspecao";
  if (/novo|new|selad|全新|por abrir|lacrad/.test(t)) return "novo";
  if (/usado|used|como novo|二手|seminov/.test(t)) return "usado";
  return null;
}
