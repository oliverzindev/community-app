/** Community Rep — constantes de marca (fonte única de verdade). */
export const BRAND = {
  name: "Community Rep",
  tagline: "Pesquisa e compra em marketplaces chineses, em português.",
  description:
    "A Community Rep reúne a pesquisa de vários marketplaces chineses num só sítio, em português de Portugal, com preços em euros e compra através da HipoBuy.",
  links: {
    hipobuyInvite: "https://m.hipobuy.com/pages/register/index?inviteCode=F9WKIDYKC",
    discord: "https://discord.gg/SwQvSNMXRF"
  }
} as const;

/** Paleta oficial (ver Design System). */
export const COLORS = {
  navy: "#071A38",
  deep: "#102C52",
  royal: "#2563EB",
  blue2: "#3B82F6",
  light: "#60A5FA",
  white: "#EFF6FF"
} as const;

export type MarketplaceId = "xianyu" | "taobao" | "e1688" | "weidian" | "jd";

export interface MarketplaceInfo {
  id: MarketplaceId;
  label: string;
  /** A pesquisa está operacional nesta fase? */
  live: boolean;
  note: string;
  /** Glifo curto para o selo do marketplace (representação estilizada, não o logótipo oficial). */
  glyph: string;
  /** Cor de marca do marketplace, só para o selo. */
  color: string;
}

export const MARKETPLACES: MarketplaceInfo[] = [
  { id: "xianyu", label: "Xianyu", live: true, note: "Segunda mão. Fonte pública de terceiros.", glyph: "闲", color: "#F6C915" },
  { id: "taobao", label: "Taobao", live: false, note: "Requer API/fornecedor autorizado.", glyph: "淘", color: "#FF5000" },
  { id: "e1688", label: "1688", live: false, note: "Requer API oficial aprovada ou fornecedor.", glyph: "1688", color: "#FF6A00" },
  { id: "weidian", label: "Weidian", live: false, note: "Requer fornecedor de dados.", glyph: "微", color: "#E63329" },
  { id: "jd", label: "JD", live: false, note: "Requer API de afiliados ou fornecedor.", glyph: "JD", color: "#D7141A" }
];
