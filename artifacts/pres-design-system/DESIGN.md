# PRES — Design Language Reference

PRES is a pre-drinks party game for UK university students. Every surface communicates one thing: **this is a party, not a product**. The aesthetic is nightclub dark — deep indigo/navy backgrounds, glowing coral and violet highlights, Inter typeface pushed to its boldest weights, and rounded sticker-style cards that feel tactile and fun.

---

## Palette

| Role | Dark (app default) | Light |
|---|---|---|
| `background` | `#140B4A` — deep navy indigo | `#FAF8FF` — warm white |
| `foreground` | `#FFFFFF` | `#140B4A` |
| `card` | `#2C1496` — violet card surface | `#FFFFFF` |
| `primary` | `#FF6B4A` — coral CTA | `#FF6B4A` |
| `secondary` | `#5328FC` — violet action | `#5328FC` |
| `muted` | `#24106F` — dark purple surface | `#EDE9FA` |
| `mutedForeground` | `#B9B2E6` — lavender | `#5C3D8F` |
| `destructive` | `#FF5A70` — hot pink | `#FF5A70` |
| `border` | `#2D2169` | `#DDD6F5` |
| `ring` | `#5C24FF` | `#5C24FF` |

The app also uses one-off gradient stops in some screens (`#3611D2`, `#0a031d`, `#1a0b3b`, `#180353`). These are not semantic roles — they are art-directed gradient endpoints baked into specific screen components.

---

## Typography

**Sole typeface:** Inter. No mixing.

| Usage | Weight | Transform |
|---|---|---|
| Section kicker labels (e.g. "PICK A GAME") | 800 ExtraBold | `uppercase`, wide `letterSpacing` |
| Screen headings | 700 Bold | — |
| CTA button labels | 700 Bold | — |
| Card titles | 600 SemiBold | — |
| Body / descriptions | 400–500 | — |
| Muted sub-labels | 400 | `mutedForeground` colour |

The 800-weight uppercase kicker is the single most distinctive typographic pattern in PRES. Use it for every section divider and group header.

---

## Radius

- **Base radius:** 16 px (`1rem`) — used on cards, inputs, and most containers.
- **Pill radius:** `borderRadius: 99` (effectively 50 % radius) — used on all primary buttons ("Play game", "Continue"), badge pills, and toggle chips.
- **Small items:** 8 px — used on inner chips, segmented control segments.

---

## Surfaces & gradients

Screens use **two-stop linear gradients** rather than a flat fill:

| Screen | Gradient |
|---|---|
| Home / default | `#3611D2` → `#140B4A` (indigo to deep navy) |
| Game settings | `#0a031d` → `#1a0b3b` (near-black violet) |
| Themes picker | `#180353` → `#0c0022` (ultra-dark purple) |
| Theme cards | Per-theme (Casual emerald, Crazy violet, Flirty rose, Sexy pink, Edgy lime) |

Cards sit on top of these gradients. The card surface (`#2C1496`) provides a lighter "lifted" layer. Never use a flat solid page background outside the token system.

---

## Component patterns

### Sticker game cards
- White/light background panel (the "sticker")
- Rounded corners (16 px)
- Game artwork PNG centred on top
- Game title bold below
- Player count badge pill in bottom-left corner

### Pill CTAs
- `borderRadius: 99`
- Bold label, all-caps optional
- Primary: `bg-primary text-primary-foreground` (coral fill, white text)
- Secondary: `bg-secondary text-secondary-foreground` (violet fill, white text)
- Full-width at screen bottom with safe-area padding

### Loser's Fate cards
- Dark muted surface (`bg-muted` / `#22104d`)
- Thin translucent border (`border` token)
- Sticker image left, text right layout
- On/off toggle using secondary colour when active

### Segmented controls (round length)
- Three segments: Short / Medium / Long
- Active segment: white background, bold text
- Inactive: transparent, muted text
- 8 px corner radius

### Section kickers
```
text-xs font-extrabold uppercase tracking-widest text-muted-foreground
```
Used to label every horizontal scroll section (e.g. "WHAT'S NEW", "PICK A GAME").

---

## Motion & interaction (Expo / React Native)

- Scroll snapping on theme carousels: `snapToInterval`, `decelerationRate: "fast"`
- Card press: `activeOpacity: 0.85` via `TouchableOpacity`
- No complex animations — party-night clarity over decoration

---

## Voice & tone

- Short, punchy, uppercase kicker labels
- Emoji used sparingly in body copy (game descriptions)
- Game name always exactly as named (e.g. "Kings Cup", "Never Have I Ever")
- CTA copy: action-first verbs — "Play game", "Continue", "See all"
