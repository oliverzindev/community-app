"use client";
import { useEffect, useState } from "react";
import { BRAND, formatCny, toEur, isHttps, type Product } from "@community/shared";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { useToast } from "./Toast";
import { IconHeart, IconLink, IconCart } from "./icons";

export function ProductCard({ product, rate }: { product: Product; rate: number | null }) {
  const [fav, setFav] = useState(false);
  const toast = useToast();
  useEffect(() => setFav(isFavorite(product.id)), [product.id]);

  const eur = toEur(product.priceCny, rate);
  const img = isHttps(product.image) ? product.image : "";
  const title = product.titlePt || product.title;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(product.url);
      toast("Link copiado ✓ — cola na HipoBuy");
    } catch {
      toast("Não foi possível copiar.", "err");
    }
  }
  async function buy() {
    try {
      await navigator.clipboard.writeText(product.url);
    } catch {}
    window.open(BRAND.links.hipobuyInvite, "_blank", "noopener");
    toast("Link copiado — abre a HipoBuy e cola para encomendar");
  }

  return (
    <article className="card group flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
      <div className="relative aspect-square overflow-hidden bg-surface2">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-faint">🛍️</div>
        )}
        <span className="absolute left-2 top-2 chip bg-navy/80 capitalize">{product.marketplace}</span>
        <button
          onClick={() => {
            const now = toggleFavorite(product);
            setFav(now);
            toast(now ? "Guardado nos favoritos ★" : "Removido dos favoritos");
          }}
          aria-label={fav ? "Remover dos favoritos" : "Guardar nos favoritos"}
          className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full border border-line bg-navy/80 transition-colors ${
            fav ? "text-rose-400" : "text-muted hover:text-white"
          }`}
        >
          <IconHeart size={17} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink" title={title}>
          {title}
        </h3>
        {product.title && title !== product.title && (
          <p className="line-clamp-1 text-xs text-faint" title={product.title}>{product.title}</p>
        )}
        <div className="flex items-baseline gap-2">
          {product.priceCny != null ? (
            <>
              <span className="text-lg font-bold text-brand-300">{formatCny(product.priceCny)}</span>
              {eur && <span className="text-sm font-semibold text-brand-500">≈ {eur}</span>}
            </>
          ) : (
            <span className="text-sm text-faint">preço n/d</span>
          )}
        </div>
        {(product.sellerName || product.location) && (
          <p className="truncate text-xs text-faint">
            {[product.sellerName, product.sellerCredit && `crédito ${product.sellerCredit}`, product.location].filter(Boolean).join(" · ")}
          </p>
        )}
        <div className="mt-auto flex gap-2 pt-1.5">
          <button onClick={buy} className="btn btn-primary flex-1 py-2 text-xs"><IconCart size={15} /> HipoBuy</button>
          <button onClick={copyLink} aria-label="Copiar link" className="btn btn-ghost px-3 py-2"><IconLink size={15} /></button>
        </div>
      </div>
    </article>
  );
}
