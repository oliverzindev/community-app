import { NextResponse } from "next/server";
import { getRate } from "@/lib/server/exchange";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const r = await getRate();
  return NextResponse.json(r, { headers: { "cache-control": "public, max-age=3600" } });
}
