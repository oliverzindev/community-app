"use client";
import { useEffect, useState } from "react";
import { getRate } from "@/lib/api";
import { getFavorites } from "@/lib/favorites";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@community/shared";

export default function FavoritosPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [rate, setRate] = useState<number | null>(null);
  useEffect(() => {
    const refresh = () => setItems(getFavorites());
    refresh();
    getRate().then((r) => setRate(r.rate));
    window.addEventListener("ca:favorites", refresh);
    return () => window.removeEventListener("ca:favorites", refresh);
  }, []);

  return (
    <div className="container-app py-10">
      <h1 className="mb-6 text-2xl font-bold text-white">Favoritos</h1>
      {items.length === 0 ? (
        <div className="card p-12 text-center text-muted">
          <p className="text-ink">Ainda não tens favoritos.</p>
          <p className="mt-1 text-sm text-faint">Nos resultados da pesquisa, carrega no coração para guardar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={`${p.marketplace}-${p.id}`} product={p} rate={rate} />)}
        </div>
      )}
    </div>
  );
}
