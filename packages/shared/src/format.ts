/** Formatação PT-PT partilhada. */
const eur = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
const cny = new Intl.NumberFormat("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatEur = (n: number) => eur.format(n);
export const formatCny = (n: number) => `¥${cny.format(n)}`;

/** Converte CNY→EUR com a taxa dada (EUR por 1 CNY). */
export function toEur(priceCny: number | null | undefined, rate: number | null | undefined): string | null {
  if (priceCny == null || rate == null || !isFinite(priceCny) || !isFinite(rate)) return null;
  return eur.format(priceCny * rate);
}

export function isHttps(u: unknown): u is string {
  return typeof u === "string" && /^https:\/\//.test(u);
}
