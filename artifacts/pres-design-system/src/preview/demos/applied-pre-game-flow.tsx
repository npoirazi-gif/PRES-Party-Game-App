import { useState } from 'react';
import { tokens } from '../../generated/tokens';

// ---------------------------------------------------------------------------
// Design tokens — no raw hex values outside of documented art-directed stops
// ---------------------------------------------------------------------------
const c = tokens.color.dark;
const cl = tokens.color.light;

// Art-directed gradient for the game-settings screen (see DESIGN.md)
const SETTINGS_GRAD_TOP = '#0a031d';
const SETTINGS_GRAD_BOT = '#1a0b3b';

// ---------------------------------------------------------------------------
// Web preview sub-components — mirror the RN DS component contracts
// ---------------------------------------------------------------------------

type RoundLength = 'short' | 'medium' | 'long';

const SEGMENTS: { value: RoundLength; label: string }[] = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];

/** Mirrors SegmentedControl from @workspace/pres-design-system/components/native/segmented-control */
function SegmentedControlPreview({
  value,
  onChange,
}: {
  value: RoundLength;
  onChange: (v: RoundLength) => void;
}) {
  return (
    <div
      style={{
        // Semi-transparent track — art-directed overlay, not a token
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 8,
        padding: 3,
        display: 'flex',
        gap: 2,
      }}
    >
      {SEGMENTS.map((seg) => {
        const active = seg.value === value;
        return (
          <button
            key={seg.value}
            type="button"
            onClick={() => onChange(seg.value)}
            style={{
              flex: 1,
              background: active ? cl.card : 'transparent', // white pill when active
              color: active ? c.background : c.mutedForeground,
              borderRadius: 6,
              border: 'none',
              fontWeight: active ? 700 : 400,
              fontSize: 13,
              padding: '7px 0',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}

/** Mirrors LoserFateCard from @workspace/pres-design-system/components/native/loser-fate-card */
function LoserFateCardPreview({
  emoji,
  title,
  description,
  enabled,
  onToggle,
}: {
  emoji: string;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        background: c.popover, // #22104D — dark muted surface
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: c.foreground, fontWeight: 600, fontSize: 14, margin: 0 }}>{title}</p>
        <p style={{ color: c.mutedForeground, fontSize: 11, marginTop: 2, margin: 0 }}>{description}</p>
      </div>
      {/* Toggle pill */}
      <button
        type="button"
        onClick={() => onToggle(!enabled)}
        aria-checked={enabled}
        role="switch"
        style={{
          width: 44,
          height: 24,
          borderRadius: 99,
          background: enabled ? c.secondary : c.border,
          border: 'none',
          position: 'relative',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: enabled ? 22 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: c.foreground,
            transition: 'left 0.18s',
          }}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo page
// ---------------------------------------------------------------------------

export function AppliedPreGameFlowDemo() {
  const [roundLength, setRoundLength] = useState<RoundLength>('medium');
  const [losers, setLosers] = useState(true);
  const [wildcard, setWildcard] = useState(false);

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
              background: `linear-gradient(180deg, ${SETTINGS_GRAD_TOP} 0%, ${SETTINGS_GRAD_BOT} 100%)`,
              borderRadius: 32,
              overflow: 'hidden',
              boxShadow: '0 8px 48px rgba(0,0,0,0.64)',
              padding: '36px 20px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            }}
          >
            {/* Screen heading */}
            <div>
              <p
                style={{
                  color: c.mutedForeground,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                GAME SETTINGS
              </p>
              <p
                style={{
                  color: c.foreground,
                  fontWeight: 700,
                  fontSize: 24,
                  marginTop: 4,
                  margin: 0,
                }}
              >
                Kings Cup
              </p>
            </div>

            {/* Round length */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p
                style={{
                  color: c.mutedForeground,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                ROUND LENGTH
              </p>
              <SegmentedControlPreview value={roundLength} onChange={setRoundLength} />
            </div>

            {/* Loser's Fate toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p
                style={{
                  color: c.mutedForeground,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                LOSER'S FATE
              </p>
              <LoserFateCardPreview
                emoji="💀"
                title="Loser's Fate"
                description="Last-place player does a dare"
                enabled={losers}
                onToggle={setLosers}
              />
              <LoserFateCardPreview
                emoji="🃏"
                title="Wildcard"
                description="Random chaos every round"
                enabled={wildcard}
                onToggle={setWildcard}
              />
            </div>

            {/* Pill Continue CTA */}
            <button
              type="button"
              style={{
                background: c.primary,
                color: c.primaryForeground,
                borderRadius: 99,
                border: 'none',
                fontWeight: 700,
                fontSize: 16,
                padding: '16px 0',
                width: '100%',
                cursor: 'pointer',
                marginTop: 4,
              }}
            >
              Continue
            </button>
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
              Art-directed linear-gradient(180deg, #0a031d → #1a0b3b) — the game-settings surface. Never a flat solid fill.
            </span>
          </li>
          <li>
            <span className="font-semibold">Section kicker</span>
            <span className="ml-2 text-muted-foreground">
              font-weight 800, uppercase, letterSpacing 2 px, {`tokens.color.dark.mutedForeground`}. Labels every group of controls.
            </span>
          </li>
          <li>
            <span className="font-semibold">SegmentedControl</span>
            <span className="ml-2 text-muted-foreground">
              DS component. Active segment: {`tokens.color.light.card`} fill, {`tokens.color.dark.background`} text. Inactive: transparent, {`tokens.color.dark.mutedForeground`} text. Uses lowercase values: {`'short' | 'medium' | 'long'`}.
            </span>
          </li>
          <li>
            <span className="font-semibold">LoserFateCard</span>
            <span className="ml-2 text-muted-foreground">
              DS component. Surface: {`tokens.color.dark.popover`} (#22104D), 1 px border {`tokens.color.dark.border`}. Toggle uses {`tokens.color.dark.secondary`} (violet) when on.
            </span>
          </li>
          <li>
            <span className="font-semibold">PillButton (Continue)</span>
            <span className="ml-2 text-muted-foreground">
              DS component. Full-width ({`fullWidth`} prop), borderRadius 99, {`tokens.color.dark.primary`} fill, font-weight 700. Pass {`variant="coral"`}.
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
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Design-system components — import these; don't rebuild them by hand
import { SegmentedControl } from '@workspace/pres-design-system/components/native/segmented-control';
import { LoserFateCard }    from '@workspace/pres-design-system/components/native/loser-fate-card';
import { PillButton }       from '@workspace/pres-design-system/components/native/pill-button';
import { tokens }           from '@workspace/pres-design-system/tokens';
import type { RoundLength } from '@workspace/pres-design-system/components/native/segmented-control';

const c = tokens.color.dark;

// Art-directed gradient stops for this screen (not semantic tokens — see DESIGN.md)
const SETTINGS_GRAD: [string, string] = ['#0a031d', '#1a0b3b'];

export function GameSettingsScreen({ game, onContinue }: {
  game: { title: string };
  onContinue: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [roundLength, setRoundLength] = useState<RoundLength>('medium');
  const [losers, setLosers]     = useState(true);
  const [wildcard, setWildcard] = useState(false);

  return (
    <LinearGradient
      colors={SETTINGS_GRAD}
      style={[s.root, { paddingBottom: insets.bottom + 16 }]}
    >
      {/* Section kicker + screen title */}
      <Text style={s.kicker}>GAME SETTINGS</Text>
      <Text style={s.heading}>{game.title}</Text>

      {/* Round length — SegmentedControl uses 'short'|'medium'|'long' */}
      <Text style={[s.kicker, s.sectionGap]}>ROUND LENGTH</Text>
      <SegmentedControl value={roundLength} onChange={setRoundLength} />

      {/* Loser's Fate toggle rows */}
      <Text style={[s.kicker, s.sectionGap]}>LOSER'S FATE</Text>
      <LoserFateCard
        title="Loser's Fate"
        description="Last-place player does a dare"
        enabled={losers}
        onToggle={setLosers}
      />
      <LoserFateCard
        title="Wildcard"
        description="Random chaos every round"
        enabled={wildcard}
        onToggle={setWildcard}
      />

      {/* Spacer pushes CTA to the bottom */}
      <View style={{ flex: 1 }} />

      {/* Full-width coral pill CTA */}
      <PillButton label="Continue" onPress={onContinue} fullWidth variant="coral" />
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 20, gap: 8 },
  kicker: {
    fontFamily: tokens.fontFamily.sans[0],
    color: c.mutedForeground,   // tokens.color.dark.mutedForeground
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heading: {
    fontFamily: tokens.fontFamily.sans[0],
    color: c.foreground,        // tokens.color.dark.foreground
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionGap: { marginTop: 20 },
});`}
        </pre>
      </section>
    </div>
  );
}
