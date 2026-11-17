"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "./icons";

export function HomeSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();
  function go(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim().length < 2) return;
    router.push(`/pesquisa?q=${encodeURIComponent(q.trim())}&m=xianyu`);
  }
  return (
    <form onSubmit={go} className="card flex items-center gap-2 p-2 shadow-glow">
      <span className="pl-2 text-faint"><IconSearch size={20} /></span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="O que procuras? ex. bolsa de água quente"
        className="flex-1 bg-transparent px-1 py-2 text-ink outline-none placeholder:text-faint"
        maxLength={100}
      />
      <button className="btn btn-primary" type="submit">Pesquisar</button>
    </form>
  );
}
