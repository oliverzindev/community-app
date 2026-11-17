"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getHistory, clearHistory, type HistoryItem } from "@/lib/history";
import { IconHistory, IconSearch } from "@/components/icons";

export default function HistoricoPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  useEffect(() => {
    const refresh = () => setItems(getHistory());
    refresh();
    window.addEventListener("ca:history", refresh);
    return () => window.removeEventListener("ca:history", refresh);
  }, []);

  return (
    <div className="container-app py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-white"><IconHistory size={22} /> Histórico</h1>
        {items.length > 0 && <button onClick={clearHistory} className="btn btn-ghost text-sm">Limpar histórico</button>}
      </div>
      {items.length === 0 ? (
        <div className="card p-12 text-center text-muted">
          <p className="text-ink">Ainda não há pesquisas.</p>
          <p className="mt-1 text-sm text-faint">As tuas pesquisas recentes aparecem aqui (guardadas neste dispositivo).</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((h, i) => (
            <li key={i}>
              <Link href={`/pesquisa?q=${encodeURIComponent(h.q)}&m=${h.marketplace}`} className="card flex items-center justify-between p-4 transition-colors hover:border-brand-500/50">
                <span className="flex items-center gap-3"><IconSearch size={16} className="text-faint" /> <span className="font-medium text-ink">{h.q}</span></span>
                <span className="text-xs text-faint">{new Date(h.at).toLocaleString("pt-PT")}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
