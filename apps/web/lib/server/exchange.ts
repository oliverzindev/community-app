/* Taxa CNY→EUR (BCE/Frankfurter, com alternativa). Cache em memória (6h). */
import "server-only";

let cached: { rate: number; date: string; source: string; at: number } | null = null;
const TTL = 6 * 60 * 60 * 1000;

const SOURCES = [
  { name: "Banco Central Europeu (Frankfurter)", url: "https://api.frankfurter.dev/v1/latest?base=CNY&symbols=EUR", parse: (d: any) => ({ rate: d?.rates?.EUR, date: d?.date }) },
  { name: "ExchangeRate-API", url: "https://open.er-api.com/v6/latest/CNY", parse: (d: any) => ({ rate: d?.result === "success" ? d?.rates?.EUR : null, date: d?.time_last_update_utc ? new Date(d.time_last_update_utc).toISOString().slice(0, 10) : null }) }
];

export async function getRate(): Promise<{ rate: number | null; date: string | null; source: string | null }> {
  if (cached && Date.now() - cached.at < TTL) return { rate: cached.rate, date: cached.date, source: cached.source };
  for (const s of SOURCES) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 9000);
      const res = await fetch(s.url, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const { rate, date } = s.parse(await res.json());
      if (typeof rate === "number" && rate > 0 && rate < 1) {
        cached = { rate, date: date || new Date().toISOString().slice(0, 10), source: s.name, at: Date.now() };
        return { rate: cached.rate, date: cached.date, source: cached.source };
      }
    } catch {
      /* tenta a próxima fonte */
    }
  }
  if (cached) return { rate: cached.rate, date: cached.date, source: cached.source };
  return { rate: null, date: null, source: null };
}
