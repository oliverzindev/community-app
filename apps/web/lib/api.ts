import type { SearchRequest, SearchResponse, RateInfo } from "@community/shared";

/**
 * Cliente da API Community Rep.
 * O endereço vem de NEXT_PUBLIC_API_URL. Nunca contém chaves — essas ficam no backend.
 */
// Vazio = mesma origem (as API routes /api/* deste site). Ou um backend externo, se definido.
const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export function apiConfigured(): boolean {
  return true;
}

export async function searchProducts(req: SearchRequest, signal?: AbortSignal): Promise<SearchResponse> {
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
    return { ok: false, error: "Não foi possível contactar a Community Rep.", code: "NETWORK" };
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
