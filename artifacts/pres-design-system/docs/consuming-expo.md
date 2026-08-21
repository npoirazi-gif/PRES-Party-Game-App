# Consuming the PRES Design System in Expo

This guide covers importing tokens and (optionally) native components from
`@workspace/pres-design-system` into an Expo / React Native artifact.

---

## 1. Add the dependency

```jsonc
// In your Expo artifact's package.json:
"dependencies": {
  "@workspace/pres-design-system": "workspace:*"
}
```

Then run `pnpm install` from the workspace root.

---

## 2. Import tokens

```ts
import { tokens } from '@workspace/pres-design-system';
// or
import { tokens } from '@workspace/pres-design-system/tokens';
```

`tokens` is a plain JavaScript object — no JSX, no browser APIs. Safe to import
in any React Native or Node context.

### Actual token shape

The generated `tokens` object has this structure (abbreviated):

```ts
tokens.color.dark.background      // '#140B4A'
tokens.color.dark.primary         // '#FF6B4A'  coral CTA
tokens.color.dark.secondary       // '#5328FC'  violet action
tokens.color.dark.card            // '#2C1496'
tokens.color.dark.muted           // '#24106F'
tokens.color.dark.mutedForeground // '#B9B2E6'
tokens.color.dark.destructive     // '#FF5A70'
tokens.color.dark.ring            // '#5C24FF'

tokens.fontFamily.sans            // ['Inter', 'sans-serif']
tokens.fontFamily.serif           // ['Georgia', 'serif']
tokens.fontFamily.mono            // ['Menlo', 'monospace']

tokens.radius                     // '1rem'   (a CSS string — convert for RN)
tokens.spacing                    // '0.25rem' (a CSS string — convert for RN)
```

> **Note:** typography is under `tokens.fontFamily.*`, not
> `tokens.typography.fontFamily.*`. Radius and spacing are top-level strings,
> not nested objects.

---

## 3. Helper — parse dimension tokens

Expo StyleSheet does not accept `rem` strings. Convert with:

```ts
// constants/ds.ts
import { tokens } from '@workspace/pres-design-system/tokens';

const BASE_PX = 16;
const rem = (r: string) => parseFloat(r) * BASE_PX;

/** The PRES dark palette — the only mode the app uses. */
export const dsColor = tokens.color.dark;

/** 16 px — matches the legacy cornerRadius constant. */
export const dsRadius = rem(tokens.radius); // parseFloat('1rem') * 16 = 16

/** 4 px base spacing unit. */
export const dsSpacing = rem(tokens.spacing); // parseFloat('0.25rem') * 16 = 4

/** Inter — primary font family. */
export const dsFontFamily = tokens.fontFamily.sans[0]; // 'Inter'
```

Then use `dsColor.primary`, `dsRadius`, `dsSpacing`, `dsFontFamily` throughout
your StyleSheets.

---

## 4. Native components

If `src/components/native/` contains components matching your needs, import
them:

```ts
import { Button } from '@workspace/pres-design-system/components/native/button';
```

Native components never import from `src/components/ui/` (the web shadcn set).
They match the same public API where React Native supports it.

---

## 5. Do not copy token values

Never hardcode `'#140B4A'` or `16` directly in your Expo artifact. Always
import from this package so the single source of truth is honoured. If the
palette shifts, update `tokens.json` and re-run `pnpm tokens`; consuming
artifacts pick up the changes via the shared workspace package.

---

## 6. Migrating existing PRES screens

See `docs/migrating-expo.md` for the step-by-step checklist that replaces
hardcoded colour constants (`constants/colors.ts`) and local radius values
with imports from this package.
