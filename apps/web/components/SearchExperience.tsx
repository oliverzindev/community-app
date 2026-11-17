"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BRAND, type MarketplaceId, type Product, type SortKey } from "@community/shared";
import { searchProducts, getRate } from "@/lib/api";
import { pushHistory } from "@/lib/history";
import { ProductCard } from "./ProductCard";
import { MarketplaceTabs } from "./MarketplaceTabs";
import { Filters, emptyFilters, conditionOf, type FilterState } from "./Filters";
import { useToast } from "./Toast";
import { IconSearch, IconCamera, IconDiscord } from "./icons";

const SORTS: { v: SortKey; label: string }[] = [
  { v: "relevance", label: "Relevância" },
  { v: "newest", label: "Mais recentes" },
  { v: "price_asc", label: "Preço ↑" },
  { v: "price_desc", label: "Preço ↓" }
];

export function SearchExperience({ showSearchBar = true }: { showSearchBar?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();

  const [q, setQ] = useState(params.get("q") || "");
  const [market, setMarket] = useState<MarketplaceId | "all">(((params.get("m") as MarketplaceId) || "xianyu") as MarketplaceId);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [raw, setRaw] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>(emptyFilters());
  const [applied, setApplied] = useState<FilterState>(emptyFilters());
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    getRate().then((r) => setRate(r.rate));
  }, []);

  const run = useCallback(
    async (query: string, m: MarketplaceId | "all", s: SortKey) => {
      if (query.trim().length < 2) return;
      const mk: MarketplaceId = m === "all" ? "xianyu" : m;
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setLoading(true);
      setError(null);
      pushHistory(query.trim(), mk);
      router.replace(`/pesquisa?q=${encodeURIComponent(query)}&m=${mk}`, { scroll: false });
      try {
        const res = await searchProducts({ q: query.trim(), marketplace: mk, sort: s }, ac.signal);
        if (!res.ok) {
          setError(res.error || "Erro na pesquisa.");
          setRaw([]);
        } else {
          const list = (res.items || []).map((it) => ({ ...it, marketplace: mk }));
          setRaw(list);
          setMeta(`${list.length} produtos${res.cached ? " · cache" : res.tookMs ? ` · ${(res.tookMs / 1000).toFixed(1)}s` : ""}${res.provider ? ` · ${res.provider}` : ""}`);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("Não foi possível pesquisar.");
          setRaw([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const iq = params.get("q");
    if (iq) run(iq, ((params.get("m") as MarketplaceId) || "xianyu"), "relevance");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // contagem por marketplace (dados reais)
  const counts = useMemo(() => {
    const c: Partial<Record<MarketplaceId, number>> = {};
    (raw || []).forEach((p) => (c[p.marketplace] = (c[p.marketplace] || 0) + 1));
    return c;
  }, [raw]);

  // aplica filtros client-side sobre os resultados reais
  const items = useMemo(() => {
    if (!raw) return null;
    const min = parseFloat(applied.priceMin.replace(",", ".")) || null;
    const max = parseFloat(applied.priceMax.replace(",", ".")) || null;
    const conds = Object.entries(applied.conditions).filter(([, v]) => v).map(([k]) => k);
    return raw.filter((p) => {
      if (min != null || max != null) {
        if (p.priceCny == null || !rate) return false;
        const eur = p.priceCny * rate;
        if (min != null && eur < min) return false;
        if (max != null && eur > max) return false;
      }
      if (conds.length) {
        const c = conditionOf(`${p.titlePt || ""} ${p.title || ""}`);
        if (!c || !conds.includes(c)) return false;
      }
      return true;
    });
  }, [raw, applied, rate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    run(q, market, sort);
  }

  return (
    <div>
      {showSearchBar && (
        <form onSubmit={submit} className="card flex items-center gap-1.5 p-2 shadow-glow sm:gap-2 sm:p-2.5">
          <span className="hidden pl-2 text-faint sm:block"><IconSearch size={20} /></span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar produto…"
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-ink outline-none placeholder:text-faint sm:px-1"
            maxLength={100}
          />
          <button
            type="button"
            onClick={() => toast("Pesquisa por imagem — em breve (precisa de fornecedor compatível).")}
            aria-label="Pesquisar por imagem"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-faint hover:bg-surface2/60 hover:text-white"
          >
            <IconCamera size={19} />
          </button>
          <button className="btn btn-primary shrink-0 px-4 sm:px-6" type="submit">Pesquisar</button>
        </form>
      )}

      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        {/* Filtros */}
        <div className="lg:w-60 lg:shrink-0">
          <Filters value={filters} counts={counts} onChange={setFilters} onApply={() => setApplied(filters)} />
        </div>

        {/* Centro */}
        <div className="min-w-0 flex-1">
          <MarketplaceTabs value={market} onChange={setMarket} />

          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm text-muted">
                {raw && raw.length > 0 && (
                  <>
                    <span className="font-semibold text-ink">Resultados{q ? ` para “${q}”` : ""}</span>
                    <span className="ml-2 text-xs text-faint">{meta}</span>
                  </>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-muted">
                <span className="hidden sm:inline">Ordenar por:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey);
                    if (raw) run(q, market, e.target.value as SortKey);
                  }}
                  className="input w-36 py-2 text-sm"
                >
                  {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
                </select>
              </label>
            </div>

            {loading && <ResultsSkeleton />}
            {!loading && error && (
              <div className="card p-8 text-center"><p className="text-ink">{error}</p><p className="mt-1 text-sm text-faint">Tenta de novo ou muda os termos.</p></div>
            )}
            {!loading && !error && items && items.length === 0 && (
              <div className="card p-10 text-center text-muted">
                <p className="text-ink">{raw && raw.length ? "Nenhum resultado com estes filtros." : "Sem resultados."}</p>
                <p className="mt-1 text-sm text-faint">{raw && raw.length ? "Ajusta o preço ou o estado à esquerda." : "Experimenta outros termos."}</p>
              </div>
            )}
            {!loading && !error && items && items.length > 0 && (
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                {items.map((p) => <ProductCard key={`${p.marketplace}-${p.id}`} product={p} rate={rate} />)}
              </div>
            )}
            {!loading && !error && !raw && (
              <div className="card p-10 text-center text-muted">
                <p className="text-ink">Escreve o que procuras e carrega em Pesquisar.</p>
                <p className="mt-1 text-sm text-faint">Prioridade ao Xianyu. Os outros marketplaces entram em breve.</p>
              </div>
            )}
          </div>
        </div>

        {/* Direita */}
        <div className="space-y-4 lg:w-64 lg:shrink-0">
          <div className="card p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-ink">⚡ Como funciona?</h3>
            <ol className="mt-3 space-y-3">
              {[
                ["1", "Pesquisa o produto", "Encontra em vários marketplaces da China."],
                ["2", "Copia e compra", "Clica em “Comprar na HipoBuy” e o link é copiado."],
                ["3", "Finaliza na HipoBuy", "Cola o link no Custom Order / Fill and Buy."]
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-600/20 text-xs font-bold text-brand-300">{n}</span>
                  <span className="text-sm"><span className="font-semibold text-ink">{t}</span><br /><span className="text-xs text-faint">{d}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="card bg-gradient-to-br from-brand-600/15 to-surface/70 p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-ink"><IconDiscord size={16} /> Entra na nossa comunidade</h3>
            <p className="mt-1.5 text-xs text-muted">Suporte, novidades, ofertas e ajuda da comunidade.</p>
            <a href={BRAND.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block mt-3 w-full text-sm">
              <IconDiscord size={15} /> Entrar no Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="space-y-2 p-3.5"><div className="skeleton h-4 w-full rounded" /><div className="skeleton h-4 w-2/3 rounded" /><div className="skeleton h-6 w-1/2 rounded" /></div>
        </div>
      ))}
    </div>
  );
}
