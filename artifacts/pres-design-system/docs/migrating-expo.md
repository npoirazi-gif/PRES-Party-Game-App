# Migrating existing Expo screens to the PRES Design System

Follow this checklist when replacing hardcoded colours and radii in the PRES
Expo app (`artifacts/pres`) with tokens from `@workspace/pres-design-system`.

Do NOT begin without first completing the smoke-test in `consuming-expo.md`
(add the dep, import one token, verify the dev server runs).

---

## Step 0 — Add the dependency once

```jsonc
// artifacts/pres/package.json
"dependencies": {
  "@workspace/pres-design-system": "workspace:*"
}
```

Run `pnpm install` from the workspace root.

---

## Step 1 — Create a shared token bridge

Create `artifacts/pres/constants/ds.ts`:

```ts
import { tokens } from '@workspace/pres-design-system/tokens';

// tokens.radius   = '1rem'    (CSS string — must parse to px for React Native)
// tokens.spacing  = '0.25rem' (CSS string)
// tokens.fontFamily.sans[0] = 'Inter'
const BASE_PX = 16;
const rem = (r: string) => parseFloat(r) * BASE_PX;

/** Always the dark PRES palette. */
export const dsColor = tokens.color.dark;

/** 16 px — matches legacy cornerRadius constant. */
export const dsRadius = rem(tokens.radius); // 16

/** 4 px base spacing unit. */
export const dsSpacing = rem(tokens.spacing); // 4

/** Primary font family string. */
export const dsFontFamily = tokens.fontFamily.sans[0]; // 'Inter'
```

> **Common mistake:** do not use `tokens.radius.base` or
> `tokens.typography.fontFamily.sans` — they do not exist. The generated shape
> has `tokens.radius` (string), `tokens.spacing` (string), and
> `tokens.fontFamily.sans` (string array).

---

## Step 2 — Replace constants/colors.ts references

`constants/colors.ts` defines a `Colors` object with a `light` sub-object.
Screen files consume it as `Colors.light.background`, etc. After migration,
each reference maps to a `dsColor.*` key:

| Old (`Colors.light.*`) | New (`dsColor.*`) |
|---|---|
| `background` | `background` |
| `foreground` | `foreground` |
| `card` | `card` |
| `cardForeground` | `cardForeground` |
| `primary` | `primary` |
| `primaryForeground` | `primaryForeground` |
| `secondary` | `secondary` |
| `secondaryForeground` | `secondaryForeground` |
| `muted` | `muted` |
| `mutedForeground` | `mutedForeground` |
| `accent` | `accent` |
| `accentForeground` | `accentForeground` |
| `destructive` | `destructive` |
| `destructiveForeground` | `destructiveForeground` |
| `border` | `border` |
| `input` | `input` |

One-off gradient stops (`#3611D2`, `#0a031d`, `#1a0b3b`, `#180353`, `#5c24ff`,
`#22104d`, `#ff3366`) are **art-directed screen constants** — intentionally NOT
part of the token set. Keep them as named local constants with comments in the
screens that use them.

---

## Step 3 — Migrate one screen at a time

For each screen file:

1. Remove `import { Colors } from '@/constants/colors'`.
2. Add `import { dsColor, dsRadius } from '@/constants/ds'`.
3. Replace `Colors.light.*` with `dsColor.*`.
4. Replace hardcoded `16` radii with `dsRadius` and multiples of `dsSpacing`.
5. Verify the Expo dev server shows no visual regression.

Start with a simple screen (e.g. `settings.tsx`) before tackling gradient
screens (`game-settings.tsx`, `themes.tsx`).

---

## Step 4 — Verify and clean up

After all screens are migrated:

```bash
# From workspace root:
pnpm --filter @workspace/pres typecheck
```

If typecheck passes and the Expo preview looks unchanged, `constants/colors.ts`
can be deleted or kept as a thin re-export for backward compat.

---

## Gotchas

- `tokens.color.dark.border` is `#2D2169` (solid hex). The original
  `constants/colors.ts` had `rgba(255,255,255,0.14)` — if you need the
  transparent overlay for layered surfaces, keep the local rgba literal.
- `tokens.color.dark.input` is `#261B58`. Same note — the original was
  `rgba(255,255,255,0.12)`.
- Never import from `@workspace/pres-design-system/components/ui/*` in Expo —
  those are web (shadcn/Tailwind) components. Use native components from
  `@workspace/pres-design-system/components/native/*` if they exist, or keep
  local React Native components.
