import { NextResponse } from "next/server";
import type { SearchResponse } from "@community/shared";
import { searchXianyu } from "@/lib/server/providers";
import { queryToChinese, titlesToPt } from "@/lib/server/translate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clampInt(v: unknown, min: number, max: number, def: number) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : def;
}

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Pedido inválido." } satisfies SearchResponse, { status: 400 });
  }

  const qPt = String(body.q || "").trim().slice(0, 100);
  if (qPt.length < 2) return NextResponse.json({ ok: false, error: "Pesquisa demasiado curta." } satisfies SearchResponse, { status: 400 });

  const marketplace = body.marketplace === "xianyu" ? "xianyu" : "xianyu"; // nesta fase só o Xianyu está ligado
  const sort = ["relevance", "newest", "price_asc", "price_desc"].includes(body.sort) ? body.sort : "relevance";
  const page = clampInt(body.page, 1, 50, 1);

  const started = Date.now();
  try {
    const qZh = await queryToChinese(qPt);
    const items = await searchXianyu({ q: qZh, page, limit: 30, sort });

    // Tradução dos títulos ZH→PT (best-effort)
    const map = await titlesToPt(items.map((i) => i.title));
    for (const it of items) it.titlePt = map[it.title] || it.title;

    return NextResponse.json(
      { ok: true, provider: "xianyu", marketplace, query: qZh, items, tookMs: Date.now() - started } satisfies SearchResponse,
      { headers: { "cache-control": "no-store" } }
    );
  } catch (err: any) {
    const code = err?.code || "UNKNOWN";
    const status = code === "NO_TOKEN" ? 503 : code === "TIMEOUT" ? 504 : 502;
    return NextResponse.json({ ok: false, error: err?.message || "Erro na pesquisa.", code } satisfies SearchResponse, { status });
  }
}
