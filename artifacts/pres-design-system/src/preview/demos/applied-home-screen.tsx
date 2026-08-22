import { Compass, Home, Search, UserRound, Users } from 'lucide-react';
import { useState } from 'react';
import { tokens } from '../../generated/tokens';

// ---------------------------------------------------------------------------
// Design tokens — no raw hex values outside of documented art-directed stops
// ---------------------------------------------------------------------------
const c = tokens.color.dark;
const cl = tokens.color.light;

// Art-directed home-screen gradient (see DESIGN.md)
const HOME_GRAD_TOP = '#3611D2';
const HOME_GRAD_BOT = c.background; // #140B4A

type Game = {
  title: string;
  description: string;
  min: string;
  artwork: string;
  featured?: boolean;
};

const PICK_A_GAME: Game[] = [
  {
    title: 'Kings Cup',
    description: 'The classic drinking game',
    min: '3+',
    artwork: '👑',
  },
  {
    title: 'Never Have I Ever',
    description: 'Reveal your secrets',
    min: '4+',
    artwork: '🙈',
  },
  {
    title: 'Truth or Drink',
    description: 'Answer honestly',
    min: '2+',
    artwork: '🎯',
  },
];

const WHATS_NEW: Game[] = [
  {
    title: 'Most Likely To',
    description: 'Point fingers, no mercy',
    min: '3+',
    artwork: '👉',
    featured: true,
  },
  {
    title: 'Would You Rather',
    description: 'Impossible choices',
    min: '3+',
    artwork: '🤔',
    featured: true,
  },
  {
    title: 'Truth or Dare',
    description: 'Play it safe or go wild',
    min: '2+',
    artwork: '🎲',
    featured: true,
  },
];

function GameCardPreview({ game }: { game: Game }) {
  return (
    <button
      type="button"
      aria-label={`Play ${game.title}`}
      style={{
        background: cl.card,
        borderRadius: 16,
        border: 'none',
        overflow: 'hidden',
        width: 146,
        flexShrink: 0,
        boxShadow: '0 4px 20px rgba(0,0,0,0.32)',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          height: 94,
          background: game.featured
            ? `linear-gradient(135deg, ${c.primary} 0%, ${c.destructive} 100%)`
            : `linear-gradient(135deg, ${cl.muted} 0%, ${cl.border} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 42,
          lineHeight: 1,
        }}
      >
        {game.artwork}
      </span>
      <span style={{ padding: '9px 9px 4px', display: 'block' }}>
        <span
          style={{
            display: 'block',
            fontWeight: 700,
            fontSize: 12,
            color: c.background,
            lineHeight: 1.25,
          }}
        >
          {game.title}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: 9,
            color: cl.mutedForeground,
            marginTop: 3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {game.description}
        </span>
      </span>
      <span style={{ display: 'block', padding: '5px 9px 10px' }}>
        <span
          style={{
            background: c.secondary,
            color: c.secondaryForeground,
            borderRadius: 99,
            fontSize: 9,
            fontWeight: 700,
            padding: '3px 7px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Users size={9} />
          {game.min}
        </span>
      </span>
    </button>
  );
}

function GameRow({
  title,
  games,
}: {
  title: string;
  games: Game[];
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <p
        style={{
          color: c.mutedForeground,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: 'flex',
          gap: 10,
          overflowX: 'auto',
          marginRight: -20,
          paddingRight: 20,
          paddingBottom: 5,
          scrollbarWidth: 'none',
        }}
      >
        {games.map((game) => (
          <GameCardPreview key={game.title} game={game} />
        ))}
      </div>
    </section>
  );
}

const TABS = [
  { label: 'Home', Icon: Home },
  { label: 'Discover', Icon: Compass },
  { label: 'Search', Icon: Search },
  { label: 'Profile', Icon: UserRound },
];

function BottomTabBar() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <nav
      aria-label="Home screen tabs"
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: `1px solid ${c.border}`,
        background: 'rgba(20,11,74,0.78)',
        padding: '10px 8px 12px',
      }}
    >
      {TABS.map(({ label, Icon }) => {
        const active = activeTab === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTab(label)}
            aria-current={active ? 'page' : undefined}
            aria-label={`${label} tab`}
            style={{
              color: active ? c.primary : c.mutedForeground,
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              minWidth: 54,
              padding: 0,
              fontSize: 9,
              fontWeight: active ? 700 : 500,
              cursor: 'pointer',
            }}
          >
            <Icon size={17} strokeWidth={active ? 2.5 : 1.8} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Demo page
// ---------------------------------------------------------------------------

export function AppliedHomeScreenDemo() {
  return (
    <div className="space-y-8">
      {/* ── Live preview — phone frame ─────────────────────────────────────── */}
      <section>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
          Live preview — interactive
        </p>
        <div className="flex justify-center">
          <div
            style={{
              width: 360,
              maxWidth: '100%',
              minHeight: 690,
              background: `linear-gradient(180deg, ${HOME_GRAD_TOP} 0%, ${HOME_GRAD_BOT} 100%)`,
              borderRadius: 32,
              overflow: 'hidden',
              boxShadow: '0 8px 48px rgba(0,0,0,0.64)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Phone status bar / safe-area hint */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px 5px',
                color: c.foreground,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              <span>9:41</span>
              <span style={{ letterSpacing: 2 }}>•••</span>
            </div>

            {/* Home header */}
            <header
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 20px 23px',
              }}
            >
              <div>
                <p
                  style={{
                    color: c.foreground,
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: -1,
                    margin: 0,
                  }}
                >
                  PRES
                </p>
                <p
                  style={{
                    color: c.mutedForeground,
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: 1.3,
                    textTransform: 'uppercase',
                    margin: '2px 0 0',
                  }}
                >
                  Pick your poison
                </p>
              </div>
              <button
                type="button"
                aria-label="Open profile"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  border: `2px solid ${c.primary}`,
                  background: c.secondary,
                  color: c.foreground,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                ✦
              </button>
            </header>

            {/* Two card discovery rails */}
            <main
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 25,
                padding: '0 20px 25px',
                flex: 1,
                overflow: 'hidden',
              }}
            >
              <GameRow title="PICK A GAME" games={PICK_A_GAME} />
              <GameRow title="WHAT'S NEW" games={WHATS_NEW} />
            </main>

            <BottomTabBar />
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
            <span className="font-semibold">Screen gradient</span>
            <span className="ml-2 text-muted-foreground">
              The home surface uses the art-directed two-stop gradient #3611D2 →{' '}
              {`tokens.color.dark.background`} (#140B4A), never a flat fill.
            </span>
          </li>
          <li>
            <span className="font-semibold">Section kicker</span>
            <span className="ml-2 text-muted-foreground">
              “PICK A GAME” and “WHAT&apos;S NEW” use the distinctive 800 ExtraBold,
              uppercase, 2 px letter-spaced label style with{' '}
              {`tokens.color.dark.mutedForeground`}.
            </span>
          </li>
          <li>
            <span className="font-semibold">Horizontal rows</span>
            <span className="ml-2 text-muted-foreground">
              Each section owns a horizontal scroll container with 10 px gaps,
              20 px side padding, and a partial next card to invite swiping.
            </span>
          </li>
          <li>
            <span className="font-semibold">Game cards</span>
            <span className="ml-2 text-muted-foreground">
              The whole white sticker card is the tap target. Cards use a 16 px
              radius, centred artwork, bold title, and a violet player-count pill.
            </span>
          </li>
          <li>
            <span className="font-semibold">Bottom tab bar</span>
            <span className="ml-2 text-muted-foreground">
              A persistent dark navigation surface anchors Home, Discover, Search,
              and Profile. The active tab uses the coral primary token.
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
{`import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GameCard } from '@workspace/pres-design-system/components/native/game-card';
import { tokens } from '@workspace/pres-design-system/tokens';
import type { Game } from '@/data/games';

const c = tokens.color.dark;
// Art-directed stops from DESIGN.md; c.background keeps the navy token in sync.
const HOME_GRAD: [string, string] = ['#3611D2', c.background];

const gameImages: Record<string, any> = {
  'kings-cup': require('@/assets/images/games/kings-cup.png'),
  'never-have-i-ever': require('@/assets/images/games/never-have-i-ever.png'),
  // Add the rest of the game IDs used by your rows.
};

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'discover', label: 'Discover', icon: 'compass-outline' },
  { id: 'search', label: 'Search', icon: 'search-outline' },
  { id: 'profile', label: 'Profile', icon: 'person-outline' },
] as const;
type TabId = (typeof TABS)[number]['id'];

function GameRow({ title, games, onSelect }: {
  title: string;
  games: Game[];
  onSelect: (game: Game) => void;
}) {
  return (
    <View style={s.section}>
      <Text style={s.kicker}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.row}
      >
        {games.map((game) => (
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
              playerCount={parseInt(game.min, 10)}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function BottomTabs({ activeTab, onChange }: {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <View style={s.tabs}>
      {TABS.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: active }}
            style={s.tab}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={active ? c.primary : c.mutedForeground}
            />
            <Text style={[s.tabLabel, active && s.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function HomeScreen({ games, onSelect, onTabChange }: {
  games: Game[];
  onSelect: (game: Game) => void;
  onTabChange?: (tab: TabId) => void;
}) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const selectTab = (tab: TabId) => {
    setActiveTab(tab);
    onTabChange?.(tab); // Connect this to your router when tabs change screens.
  };

  return (
    <LinearGradient
      colors={HOME_GRAD}
      style={[
        s.screen,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <ScrollView contentContainerStyle={s.content}>
        <GameRow title="PICK A GAME" games={games} onSelect={onSelect} />
        <GameRow title="WHAT'S NEW" games={games.slice(0, 5)} onSelect={onSelect} />
      </ScrollView>
      <BottomTabs activeTab={activeTab} onChange={selectTab} />
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  content: { gap: 24, padding: 20 },
  section: { gap: 10 },
  kicker: {
    fontFamily: tokens.fontFamily.sans[0],
    color: c.mutedForeground,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  row: { gap: 12, paddingRight: 20 },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingVertical: 12,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: 44,
  },
  tabLabel: {
    color: c.mutedForeground,
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 10,
    fontWeight: '500',
  },
  tabLabelActive: { color: c.primary, fontWeight: '700' },
});`}
        </pre>
      </section>
    </div>
  );
}