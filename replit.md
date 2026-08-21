# PRES Party Game

PRES is a playful mobile party-game app for UK university groups, with vibe-based recommendations and 16 playable games.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/pres/app/` — Expo Router screens for home, vibes, recommendations, library, game play, settings, and premium.
- `artifacts/pres/data/games.ts` — game catalogue, prompt database, and vibe recommendations.
- `artifacts/pres/context/PresContext.tsx` — local session persistence for selected vibe, recent games, and non-repeating prompts.
- `artifacts/pres/constants/colors.ts` — PRES visual tokens.

## Architecture decisions

- The first build is frontend-only and uses AsyncStorage for lightweight local session persistence; no account is required to play.
- A single reusable game screen renders game-specific modes (prompt, choice, private, timed, and player-input) from the game catalogue.
- Prompt selection records shown indexes per game so prompts do not repeat until the current session pool is exhausted.

## Product

Users can pick a pres vibe, browse curated recommendations or the complete library, and play all 16 games with prompts, choices, timers, private reveal, and optional player names.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
