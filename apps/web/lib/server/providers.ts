/*
 * Fornecedores de dados públicos (Apify) — SÓ corre no servidor (API routes).
 * O token nunca chega ao browser. Lógica alinhada com os testes unitários em backend/.
 */
import "server-only";
import type { Product, MarketplaceId } from "@community/shared";

export function parsePrice(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  const m = String(raw).replace(/\s+/g, "").match(/(\d[\d.,]*)(万|w|W)?/);
  if (!m) return null;
  let s = m[1];
  if (/,\d{1,2}$/.test(s) && !s.includes(".")) s = s.replace(",", ".");
  else s = s.replace(/,/g, "");
  if ((s.match(/\./g) || []).length > 1) return null;
  let n = Number(s);
  if (!Number.isFinite(n)) return null;
  if (m[2]) n *= 10000;
  return n;
}

function firstHttps(...vals: unknown[]): string {
  for (const v of vals) {
    if (typeof v === "string" && v) {
      const u = v.startsWith("//") ? "https:" + v : v;
      if (/^https?:\/\//.test(u)) return u.replace(/^http:/, "https:");
    }
    if (Array.isArray(v)) {
      const f = firstHttps(...v);
      if (f) return f;
    }
  }
  return "";
}

function itemUrl(id: unknown, url: unknown): string {
  if (typeof url === "string" && /goofish\.com\/item/.test(url)) return url.split("&")[0];
  if (id) return `https://www.goofish.com/item?id=${encodeURIComponent(String(id))}`;
  return "";
}

const SORTS: Record<string, Record<string, string>> = {
  khadinakbar: { relevance: "relevance", newest: "newest", price_asc: "priceAsc", price_desc: "priceDesc" },
  gantianca: { relevance: "", newest: "create", price_asc: "up_price", price_desc: "down_price" }
};

interface ProviderReq {
  q: string;
  page: number;
  limit: number;
  sort: string;
  priceMin?: number;
  priceMax?: number;
}

const adapters = {
  gantianca: {
    slug: "gantianca~xianyu-goofish-search",
    buildInput(r: ProviderReq) {
      const input: Record<string, unknown> = { keyword: r.q, pageNumber: r.page };
      if (SORTS.gantianca[r.sort]) input.sort_type = SORTS.gantianca[r.sort];
      return input;
    },
    normalize(rec: any): Product {
      const id = rec.itemId || rec.id;
      return {
        id: id ? String(id) : "",
        marketplace: "xianyu" as MarketplaceId,
        url: itemUrl(id, rec.itemUrl),
        title: String(rec.title || "").slice(0, 300),
        priceCny: parsePrice(rec.price),
        originalPriceCny: parsePrice(rec.originalPrice),
        image: firstHttps(rec.images, rec.image),
        images: Array.isArray(rec.images) ? rec.images.map((x: unknown) => firstHttps(x)).filter(Boolean).slice(0, 8) : [],
        sellerName: String(rec.sellerNick || "").slice(0, 120),
        sellerId: rec.sellerId ? String(rec.sellerId) : "",
        sellerCredit: rec.sellerCredit ? String(rec.sellerCredit) : "",
        location: String(rec.location || "")
      };
    }
  },
  khadinakbar: {
    slug: "khadinakbar~goofish-scraper",
    buildInput(r: ProviderReq) {
      const input: Record<string, unknown> = { searchQuery: r.q, maxResults: r.limit, fetchDetails: false };
      if (SORTS.khadinakbar[r.sort]) input.sortBy = SORTS.khadinakbar[r.sort];
      return input;
    },
    normalize(rec: any): Product {
      const seller = rec.seller || {};
      const id = rec.itemId || rec.id;
      return {
        id: id ? String(id) : "",
        marketplace: "xianyu" as MarketplaceId,
        url: itemUrl(id, rec.itemUrl),
        title: String(rec.title || "").slice(0, 300),
        priceCny: parsePrice(rec.price),
        image: firstHttps(rec.image, rec.images),
        images: Array.isArray(rec.images) ? rec.images.map((x: unknown) => firstHttps(x)).filter(Boolean).slice(0, 8) : [],
        sellerName: String(seller.nickname || "").slice(0, 120),
        sellerId: seller.userId ? String(seller.userId) : "",
        sellerCredit: seller.zhimaCredit ? String(seller.zhimaCredit) : "",
        location: [rec.city, rec.province].filter(Boolean).join(", ")
      };
    }
  }
} as const;

export type ProviderName = keyof typeof adapters;

async function apifyRun(slug: string, input: unknown, token: string, timeoutMs = 45000): Promise<any[]> {
  const url = `https://api.apify.com/v2/acts/${slug}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input), signal: controller.signal });
  } catch (e) {
    const err = new Error((e as Error).name === "AbortError" ? "O fornecedor demorou demasiado a responder." : "Falha de rede ao contactar o fornecedor.");
    (err as any).code = (e as Error).name === "AbortError" ? "TIMEOUT" : "NETWORK";
    throw err;
  } finally {
    clearTimeout(timer);
  }
  const text = await res.text();
  if (res.status === 401 || res.status === 403) { const e = new Error("Token do fornecedor inválido ou sem créditos."); (e as any).code = "AUTH"; throw e; }
  if (res.status === 402) { const e = new Error("Sem créditos no fornecedor de pesquisa."); (e as any).code = "QUOTA"; throw e; }
  if (!res.ok) { const e = new Error(`Fornecedor respondeu ${res.status}.`); (e as any).code = "PROVIDER"; throw e; }
  try {
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.items || [];
  } catch { const e = new Error("Resposta do fornecedor ilegível."); (e as any).code = "PROVIDER"; throw e; }
}

export function providerConfigured(): boolean {
  return Boolean(process.env.APIFY_TOKEN);
}

/** Pesquisa no Xianyu via fornecedor público. Lança erro com .code se falhar. */
export async function searchXianyu(req: ProviderReq): Promise<Product[]> {
  const token = process.env.APIFY_TOKEN;
  if (!token) { const e = new Error("A pesquisa ainda não está ligada (falta a chave APIFY_TOKEN no servidor)."); (e as any).code = "NO_TOKEN"; throw e; }
  const providerName = (process.env.SEARCH_PROVIDER as ProviderName) in adapters ? (process.env.SEARCH_PROVIDER as ProviderName) : "gantianca";
  const adapter = adapters[providerName];
  const raw = await apifyRun(adapter.slug, adapter.buildInput(req), token);
  const items: Product[] = [];
  const seen = new Set<string>();
  for (const rec of raw) {
    const it = adapter.normalize(rec);
    if (!it.id || seen.has(it.id)) continue;
    seen.add(it.id);
    items.push(it);
    if (items.length >= req.limit) break;
  }
  return items;
}
