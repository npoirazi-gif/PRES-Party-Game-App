/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#FAF8FF",
      "foreground": "#140B4A",
      "border": "#DDD6F5",
      "card": "#FFFFFF",
      "cardForeground": "#140B4A",
      "popover": "#FFFFFF",
      "popoverForeground": "#140B4A",
      "primary": "#FF6B4A",
      "primaryForeground": "#FFFFFF",
      "secondary": "#5328FC",
      "secondaryForeground": "#FFFFFF",
      "muted": "#EDE9FA",
      "mutedForeground": "#5C3D8F",
      "accent": "#FF6B4A",
      "accentForeground": "#FFFFFF",
      "destructive": "#FF5A70",
      "destructiveForeground": "#FFFFFF",
      "input": "#E8E2F5",
      "ring": "#5C24FF",
      "chart1": "#FF6B4A",
      "chart2": "#5328FC",
      "chart3": "#34D399",
      "chart4": "#FB7185",
      "chart5": "#B7F700",
      "sidebar": "#EDE9FA",
      "sidebarForeground": "#140B4A",
      "sidebarBorder": "#DDD6F5",
      "sidebarPrimary": "#FF6B4A",
      "sidebarPrimaryForeground": "#FFFFFF",
      "sidebarAccent": "#EDE9FA",
      "sidebarAccentForeground": "#140B4A",
      "sidebarRing": "#5C24FF"
    },
    "dark": {
      "background": "#140B4A",
      "foreground": "#FFFFFF",
      "border": "#2D2169",
      "card": "#2C1496",
      "cardForeground": "#FFFFFF",
      "popover": "#22104D",
      "popoverForeground": "#FFFFFF",
      "primary": "#FF6B4A",
      "primaryForeground": "#FFFFFF",
      "secondary": "#5328FC",
      "secondaryForeground": "#FFFFFF",
      "muted": "#24106F",
      "mutedForeground": "#B9B2E6",
      "accent": "#FF6B4A",
      "accentForeground": "#FFFFFF",
      "destructive": "#FF5A70",
      "destructiveForeground": "#FFFFFF",
      "input": "#261B58",
      "ring": "#5C24FF",
      "chart1": "#FF6B4A",
      "chart2": "#5328FC",
      "chart3": "#34D399",
      "chart4": "#FB7185",
      "chart5": "#B7F700",
      "sidebar": "#1A0D58",
      "sidebarForeground": "#FFFFFF",
      "sidebarBorder": "#2D2169",
      "sidebarPrimary": "#FF6B4A",
      "sidebarPrimaryForeground": "#FFFFFF",
      "sidebarAccent": "#5328FC",
      "sidebarAccentForeground": "#FFFFFF",
      "sidebarRing": "#5C24FF"
    }
  },
  "fontFamily": {
    "sans": [
      "Inter",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "Menlo",
      "monospace"
    ]
  },
  "radius": "1rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
