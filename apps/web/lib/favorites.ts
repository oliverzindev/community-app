"use client";
import type { Product } from "@community/shared";

/**
 * Favoritos locais (anónimos). Quando o sistema de contas estiver pronto (Onda 2),
 * sincroniza com o backend; o armazenamento local continua como alternativa offline.
 */
const KEY = "community_app_favorites";

export function getFavorites(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function save(list: Product[]) {
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 500)));
  window.dispatchEvent(new CustomEvent("ca:favorites"));
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.id === id);
}

export function toggleFavorite(p: Product): boolean {
  const list = getFavorites();
  const idx = list.findIndex((f) => f.id === p.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    save(list);
    return false;
  }
  list.unshift(p);
  save(list);
  return true;
}

export function removeFavorite(id: string) {
  save(getFavorites().filter((f) => f.id !== id));
}
