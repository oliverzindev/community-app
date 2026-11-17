# Community App — monorepo

Plataforma de pesquisa e compras internacionais para a comunidade lusófona.
Identidade própria (azul-marinho), independente de marcas anteriores.

## Estrutura
- `apps/web` — site + PWA (Next.js 14 + TypeScript + Tailwind). Pronto.
- `packages/shared` — tipos, schemas e constantes de marca partilhados.
- `apps/api` — backend Fastify (Onda 2).
- `apps/extension` — extensão Chrome (Onda 4).

## Desenvolvimento
```bash
npm install
# define apps/web/.env.local -> NEXT_PUBLIC_API_URL=http://localhost:PORT  (quando o backend existir)
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Estado (Onda 1 — Fases 2 e 3)
Feito: Design System, logótipo, site completo (home, pesquisa, resultados, favoritos,
como comprar, sobre, suporte, privacidade, termos, login/registo), fluxo HipoBuy, Discord, PWA.
A pesquisa liga-se a `NEXT_PUBLIC_API_URL`; o backend real entra na Onda 2.
