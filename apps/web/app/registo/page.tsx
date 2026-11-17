import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Criar conta" };

export default function RegistoPage() {
  return (
    <div className="container-app flex justify-center py-16">
      <div className="card w-full max-w-md p-7">
        <h1 className="text-2xl font-bold text-white">Criar conta</h1>
        <p className="mt-1.5 text-sm text-muted">Guarda favoritos e o teu histórico de pesquisas.</p>
        <AuthForm mode="registo" />
        <p className="mt-5 text-center text-sm text-muted">
          Já tens conta? <Link href="/login" className="font-semibold text-brand-300 hover:text-brand-400">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
