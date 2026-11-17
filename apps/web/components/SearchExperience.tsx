"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MARKETPLACES, type MarketplaceId, type Product, type SortKey } from "@community/shared";
import { searchProducts, getRate } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import { IconSearch } from "./icons";

const SORTS: { v: SortKey; label: string }[] = [
  { v: "relevance", label: "Relevância" },
  { v: "newest", label: "Mais recentes" },
  { v: "price_asc", label: "Preço ↑" },
  { v: "price_desc", label: "Preço ↓" }
];

export function SearchExperience() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const initialM = (params.get("m") as MarketplaceId) || "xianyu";

  const [q, setQ] = useState(initialQ);
  const [market, setMarket] = useState<MarketplaceId>(initialM);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<string>("");
  const [rate, setRate] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    getRate().then((r) => setRate(r.rate));
  }, []);

  const run = useCallback(
    async (query: string, m: MarketplaceId, s: SortKey) => {
      if (query.trim().length < 2) return;
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setLoading(true);
      setError(null);
      router.replace(`/pesquisa?q=${encodeURIComponent(query)}&m=${m}`, { scroll: false });
      try {
        const res = await searchProducts({ q: query.trim(), marketplace: m, sort: s }, ac.signal);
        if (!res.ok) {
          setError(res.error || "Erro na pesquisa.");
          setItems([]);
        } else {
          const list = (res.items || []).map((it) => ({ ...it, marketplace: m }));
          setItems(list);
          setMeta(`${list.length} resultados${res.cached ? " · cache" : res.tookMs ? ` · ${(res.tookMs / 1000).toFixed(1)}s` : ""}${res.provider ? ` · ${res.provider}` : ""}`);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("Não foi possível pesquisar.");
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (initialQ) run(initialQ, initialM, "relevance");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    run(q, market, sort);
  }

  return (
    <div>
      <form onSubmit={submit} className="card p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"><IconSearch /></span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Escreve em português: ex. bolsa de água quente"
              className="input pl-10"
              autoFocus
              maxLength={100}
            />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="input sm:w-44">
            {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
          </select>
          <button className="btn btn-primary sm:px-6" type="submit">Pesquisar</button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {MARKETPLACES.map((m) => (
            <button
              key={m.id}
              type="button"
              disabled={!m.live}
              onClick={() => setMarket(m.id)}
              title={m.note}
              className={`chip transition-colors ${
                market === m.id ? "border-brand-500 bg-brand-600/20 text-white" : ""
              } ${m.live ? "cursor-pointer hover:border-brand-500/60" : "cursor-not-allowed opacity-45"}`}
            >
              {m.label}{!m.live && <span className="text-[10px]">em breve</span>}
            </button>
          ))}
        </div>
      </form>

      <p className="mt-3 text-xs text-faint">
        A pesquisa é traduzida para chinês automaticamente. Resultados de fontes públicas de terceiros (não é a API oficial do marketplace). Os links são os originais do anúncio.
      </p>

      <div className="mt-6">
        {loading && <ResultsSkeleton />}
        {!loading && error && (
          <div className="card p-8 text-center">
            <p className="text-ink">{error}</p>
            <p className="mt-1 text-sm text-faint">Tenta outra vez ou muda os termos.</p>
          </div>
        )}
        {!loading && !error && items && items.length === 0 && (
          <div className="card p-10 text-center text-muted">
            <p className="text-ink">Sem resultados.</p>
            <p className="mt-1 text-sm text-faint">Experimenta termos diferentes ou outra ordenação.</p>
          </div>
        )}
        {!loading && !error && items && items.length > 0 && (
          <>
            <div className="mb-3 text-xs text-faint">{meta}</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => <ProductCard key={`${p.marketplace}-${p.id}`} product={p} rate={rate} />)}
            </div>
          </>
        )}
        {!loading && !error && !items && (
          <div className="card p-10 text-center text-muted">
            <p className="text-ink">Escreve o que procuras e carrega em Pesquisar.</p>
            <p className="mt-1 text-sm text-faint">Prioridade ao Xianyu. Os outros marketplaces entram em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="space-y-2 p-3.5">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="skeleton h-6 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
