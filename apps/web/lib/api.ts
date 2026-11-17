import type { SearchRequest, SearchResponse, RateInfo } from "@community/shared";

/**
 * Cliente da API Community App.
 * O endereço vem de NEXT_PUBLIC_API_URL. Nunca contém chaves — essas ficam no backend.
 */
const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export function apiConfigured(): boolean {
  return Boolean(API);
}

export async function searchProducts(req: SearchRequest, signal?: AbortSignal): Promise<SearchResponse> {
  if (!API) {
    return {
      ok: false,
      error: "A pesquisa ainda não está ligada (falta configurar NEXT_PUBLIC_API_URL).",
      code: "NO_API"
    };
  }
  try {
    const res = await fetch(`${API}/api/search`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
      signal
    });
    const data = (await res.json()) as SearchResponse;
    return data;
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    return { ok: false, error: "Não foi possível contactar a Community App.", code: "NETWORK" };
  }
}

export async function getRate(): Promise<RateInfo> {
  if (!API) return { rate: null };
  try {
    const res = await fetch(`${API}/api/rate`);
    const d = await res.json();
    return { rate: d.rate ?? null, date: d.date ?? null, source: d.source ?? null };
  } catch {
    return { rate: null };
  }
}
