/** Community App — constantes de marca (fonte única de verdade). */
export const BRAND = {
  name: "Community App",
  tagline: "Pesquisa e compra em marketplaces chineses, em português.",
  description:
    "A Community App reúne a pesquisa de vários marketplaces chineses num só sítio, em português de Portugal, com preços em euros e compra através da HipoBuy.",
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
}

export const MARKETPLACES: MarketplaceInfo[] = [
  { id: "xianyu", label: "Xianyu", live: true, note: "Segunda mão. Fonte pública de terceiros." },
  { id: "taobao", label: "Taobao", live: false, note: "Requer API/fornecedor autorizado." },
  { id: "e1688", label: "1688", live: false, note: "Requer API oficial aprovada ou fornecedor." },
  { id: "weidian", label: "Weidian", live: false, note: "Requer fornecedor de dados." },
  { id: "jd", label: "JD", live: false, note: "Requer API de afiliados ou fornecedor." }
];
