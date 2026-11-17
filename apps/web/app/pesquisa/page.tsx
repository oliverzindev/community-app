import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchExperience } from "@/components/SearchExperience";

export const metadata: Metadata = { title: "Pesquisar" };

export default function PesquisaPage() {
  return (
    <div className="container-app py-10">
      <h1 className="mb-6 text-2xl font-bold text-white">Pesquisar</h1>
      <Suspense fallback={<div className="card p-10 text-center text-muted">A carregar…</div>}>
        <SearchExperience />
      </Suspense>
    </div>
  );
}
