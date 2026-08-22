import { Users } from 'lucide-react';
import { tokens } from '../../generated/tokens';

// ---------------------------------------------------------------------------
// Design tokens — no raw hex values outside of documented art-directed stops
// ---------------------------------------------------------------------------
const c = tokens.color.dark;
const cl = tokens.color.light;

// Art-directed home-screen gradient (not semantic tokens — see DESIGN.md)
const HOME_GRAD_TOP = '#3611D2';
const HOME_GRAD_BOT = c.background; // #140B4A

// ---------------------------------------------------------------------------
// Web preview component — mirrors the React Native GameCard contract
// ---------------------------------------------------------------------------

function GameCardPreview({
  title,
  description,
  min,
  artwork,
}: {
  title: string;
  description: string;
  min: string; // "4+" etc — matches actual Game.min field
  artwork: string;
}) {
  return (
    <div
      style={{
        background: cl.card, // white sticker surface
        borderRadius: 16,
        overflow: 'hidden',
        width: 160,
        flexShrink: 0,
        boxShadow: '0 4px 24px rgba(0,0,0,0.36)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Artwork placeholder */}
      <div
        style={{
          height: 120,
          background: `linear-gradient(135deg, ${cl.muted} 0%, ${cl.border} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 52,
        }}
      >
        {artwork}
      </div>

      {/* Title + short description */}
      <div style={{ padding: '10px 10px 6px' }}>
        <p style={{ fontWeight: 700, fontSize: 13, color: c.background, lineHeight: 1.3, margin: 0 }}>
          {title}
        </p>
        <p style={{ fontSize: 10, color: cl.mutedForeground, marginTop: 3, margin: 0 }}>
          {description}
        </p>
      </div>

      {/* Player badge — the whole card is the tap target; no CTA inside */}
      <div style={{ padding: '6px 10px 12px' }}>
        <span
          style={{
            background: c.secondary,
            color: c.secondaryForeground,
            borderRadius: 99,
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Users size={9} />
          {min}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo page
// ---------------------------------------------------------------------------

export function AppliedGameCardDemo() {
  return (
    <div className="space-y-8">
      {/* ── Live preview ──────────────────────────────────────────────────── */}
      <section>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
          Live preview
        </p>
        <div
          style={{
            background: `linear-gradient(180deg, ${HOME_GRAD_TOP} 0%, ${HOME_GRAD_BOT} 100%)`,
            borderRadius: 20,
            padding: '24px 16px',
          }}
        >
          {/* Section kicker */}
          <p
            style={{
              color: c.mutedForeground,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            PICK A GAME
          </p>
          {/* Horizontal card row */}
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            <GameCardPreview
              title="Kings Cup"
              description="The classic drinking game"
              min="3+"
              artwork="👑"
            />
            <GameCardPreview
              title="Never Have I Ever"
              description="Reveal your secrets"
              min="4+"
              artwork="🙈"
            />
            <GameCardPreview
              title="Truth or Drink"
              description="Answer honestly or face the consequences"
              min="2+"
              artwork="🎯"
            />
          </div>
        </div>
      </section>

      {/* ── Anatomy ───────────────────────────────────────────────────────── */}
      <section className="space-y-4 rounded-xl border bg-card p-6 text-card-foreground">
        <p className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
          Anatomy
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-semibold">Card surface</span>
            <span className="ml-2 text-muted-foreground">
              {`tokens.color.light.card`} (white) with borderRadius 16 px and a deep shadow for the "sticker" lift effect. The whole card is the tap target — no CTA sits inside it.
            </span>
          </li>
          <li>
            <span className="font-semibold">Artwork area</span>
            <span className="ml-2 text-muted-foreground">
              Height 120 px, placeholder uses muted/border tokens. Replace with a centred game PNG via the
              {' '}
              <code className="rounded bg-muted px-1 text-xs">artwork</code> prop.
            </span>
          </li>
          <li>
            <span className="font-semibold">Title</span>
            <span className="ml-2 text-muted-foreground">
              font-weight 700, 13–14 px, {`tokens.color.dark.background`} (deep navy) — readable on white card.
            </span>
          </li>
          <li>
            <span className="font-semibold">Player-count badge</span>
            <span className="ml-2 text-muted-foreground">
              Pill (borderRadius 99), {`tokens.color.dark.secondary`} fill, white text, font-weight 700, 10 px.
              The design-system {`GameCard`} accepts a numeric {`playerCount`}; parse {`game.min`} ("4+") with{' '}
              <code className="rounded bg-muted px-1 text-xs">parseInt(game.min, 10)</code>.
            </span>
          </li>
          <li>
            <span className="font-semibold">Screen background</span>
            <span className="ml-2 text-muted-foreground">
              Art-directed gradient {`#3611D2 → tokens.color.dark.background`} — the home-screen surface. Section kicker uses {`tokens.color.dark.mutedForeground`}.
            </span>
          </li>
        </ul>
      </section>

      {/* ── React Native / Expo code pattern ──────────────────────────────── */}
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
          Copy-paste pattern — React Native / Expo
        </p>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
{`import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Design-system components — no manual hex values needed in consuming code
import { GameCard } from '@workspace/pres-design-system/components/native/game-card';
import { tokens } from '@workspace/pres-design-system/tokens';
import type { Game } from '@/data/games';

const c = tokens.color.dark;

// Art-directed gradient stops for the home screen (not semantic tokens)
// See DESIGN.md — "Surfaces & gradients"
const HOME_GRAD: [string, string] = ['#3611D2', c.background];

// Artwork map — keep outside the component; require() is evaluated at build time
const gameImages: Record<string, any> = {
  'most-likely-to':    require('@/assets/images/games/most-likely-to.png'),
  'never-have-i-ever': require('@/assets/images/games/never-have-i-ever.png'),
  'would-you-rather':  require('@/assets/images/games/would-you-rather.png'),
  // …repeat for all game IDs
};

// Horizontal section: kicker label + scrollable row of cards
function GameRow({ sectionTitle, games, onSelect }: {
  sectionTitle: string;
  games: Game[];
  onSelect: (game: Game) => void;
}) {
  return (
    <View style={s.section}>
      <Text style={s.kicker}>{sectionTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.row}
      >
        {games.map((game) => (
          // Whole card is the tap target — navigate to game-settings on press
          <Pressable
            key={game.id}
            onPress={() => onSelect(game)}
            style={({ pressed }) => pressed && { opacity: 0.85 }}
            accessibilityRole="button"
            accessibilityLabel={'Play ' + game.title}
          >
            <GameCard
              title={game.title}
              artwork={gameImages[game.id]}
              // game.min is a string like "4+" — parseInt gives the leading number
              playerCount={parseInt(game.min, 10)}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// Full home screen
export function HomeScreen({ games, onSelect }: {
  games: Game[];
  onSelect: (game: Game) => void;
}) {
  return (
    <LinearGradient colors={HOME_GRAD} style={s.screen}>
      <GameRow sectionTitle="WHAT'S NEW"  games={games.slice(0, 5)} onSelect={onSelect} />
      <GameRow sectionTitle="PICK A GAME" games={games}             onSelect={onSelect} />
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, paddingVertical: 24, gap: 24 },
  section: { gap: 10 },
  kicker: {
    fontFamily: tokens.fontFamily.sans[0],
    color: c.mutedForeground,     // tokens.color.dark.mutedForeground
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 16,
  },
  row: { gap: 12, paddingHorizontal: 16 },
});`}
        </pre>
      </section>
    </div>
  );
}
