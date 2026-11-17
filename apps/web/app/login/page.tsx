import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="container-app flex justify-center py-16">
      <div className="card w-full max-w-md p-7">
        <h1 className="text-2xl font-bold text-white">Entrar</h1>
        <p className="mt-1.5 text-sm text-muted">Bem-vindo de volta à Community App.</p>
        <AuthForm mode="login" />
        <p className="mt-5 text-center text-sm text-muted">
          Não tens conta? <Link href="/registo" className="font-semibold text-brand-300 hover:text-brand-400">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
