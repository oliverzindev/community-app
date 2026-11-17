import type { MarketplaceId } from "./brand";

/** Produto normalizado devolvido pela API (qualquer marketplace). */
export interface Product {
  id: string;
  marketplace: MarketplaceId;
  url: string;
  title: string;
  titlePt?: string;
  priceCny: number | null;
  originalPriceCny?: number | null;
  image: string;
  images?: string[];
  sellerName?: string;
  sellerId?: string;
  sellerCredit?: string;
  location?: string;
}

export type SortKey = "relevance" | "newest" | "price_asc" | "price_desc";

export interface SearchRequest {
  q: string;
  marketplace: MarketplaceId;
  sort?: SortKey;
  page?: number;
  priceMin?: number;
  priceMax?: number;
}

export interface SearchResponse {
  ok: boolean;
  provider?: string;
  marketplace?: MarketplaceId;
  query?: string;
  items?: Product[];
  cached?: boolean;
  tookMs?: number;
  error?: string;
  code?: string;
}

export interface RateInfo {
  rate: number | null;
  date?: string | null;
  source?: string | null;
}
