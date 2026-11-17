"use client";
import { useState } from "react";
import { useToast } from "./Toast";

/**
 * Formulário de autenticação (interface). A ligação ao backend (sessões, argon2id)
 * entra na Onda 2. Por agora valida os campos e avisa que o backend ainda não está ligado.
 */
export function AuthForm({ mode }: { mode: "login" | "registo" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Email inválido.", "err");
    if (password.length < 8) return toast("A palavra-passe precisa de pelo menos 8 caracteres.", "err");
    toast("O sistema de contas entra na próxima fase (backend).", "err");
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-3">
      <label className="block">
        <span className="text-xs text-muted">Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input mt-1" placeholder="o.teu@email.pt" />
      </label>
      <label className="block">
        <span className="text-xs text-muted">Palavra-passe</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input mt-1" placeholder="pelo menos 8 caracteres" />
      </label>
      <button className="btn btn-primary btn-block w-full" type="submit">
        {mode === "login" ? "Entrar" : "Criar conta"}
      </button>
    </form>
  );
}
