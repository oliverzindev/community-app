import { MARKETPLACES, type MarketplaceId } from "@community/shared";

/**
 * Selo estilizado do marketplace (NÃO é o logótipo oficial — é um indicador
 * de marca feito por nós, para evitar usar marcas registadas de terceiros).
 */
export function MarketLogo({ id, size = 22 }: { id: MarketplaceId; size?: number }) {
  const m = MARKETPLACES.find((x) => x.id === id)!;
  const fontSize = m.glyph.length > 2 ? size * 0.42 : size * 0.56;
  return (
    <span
      aria-hidden="true"
      className="inline-grid shrink-0 place-items-center rounded-md font-bold leading-none text-black/90"
      style={{ width: size, height: size, background: m.color, fontSize }}
    >
      {m.glyph}
    </span>
  );
}
