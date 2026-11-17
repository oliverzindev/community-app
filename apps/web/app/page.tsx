import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { SearchExperience } from "@/components/SearchExperience";

export default function HomePage() {
  return (
    <div className="container-app py-6 sm:py-8">
      <Hero />
      <div className="mt-8">
        <Suspense fallback={<div className="card p-10 text-center text-muted">A carregar…</div>}>
          <SearchExperience />
        </Suspense>
      </div>
    </div>
  );
}
