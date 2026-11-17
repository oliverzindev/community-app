"use client";
/** Histórico de pesquisas local (anónimo). Sincroniza com a conta na Onda 2. */
const KEY = "community_app_history";

export interface HistoryItem {
  q: string;
  marketplace: string;
  at: number;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function pushHistory(q: string, marketplace: string) {
  if (typeof window === "undefined" || !q.trim()) return;
  const list = getHistory().filter((h) => !(h.q === q && h.marketplace === marketplace));
  list.unshift({ q: q.trim(), marketplace, at: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  window.dispatchEvent(new CustomEvent("ca:history"));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("ca:history"));
}
