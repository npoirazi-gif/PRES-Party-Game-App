import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { games } from '@/data/games';

// ─── Toggle ─────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <Pressable onPress={() => onChange(!value)} style={[s.toggle, value && s.toggleOn]}>
      <View style={[s.thumb, value && s.thumbOn]} />
    </Pressable>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionTitle({ label, accent }: { label: string; accent?: string }) {
  return (
    <View style={s.sectionHeading}>
      <View style={[s.accentBar, { backgroundColor: accent ?? '#5c24ff' }]} />
      <Text style={s.sectionLabel}>{label}</Text>
    </View>
  );
}

export default function GameSettings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const game = games.find(g => g.id === id);

  const [mostLikely, setMostLikely] = useState(true);
  const [name3, setName3] = useState(false);
  const [punishments, setPunishments] = useState(true);
  const [truthDare, setTruthDare] = useState(true);
  const [roundLength, setRoundLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [flashingLight, setFlashingLight] = useState(true);
  const [soundFx, setSoundFx] = useState(true);

  function handleContinue() {
    if (id) {
      router.push({ pathname: '/themes', params: { id, roundLength } });
    } else {
      router.push({ pathname: '/themes', params: { roundLength } });
    }
  }

  return (
    <LinearGradient colors={['#0a031d', '#1a0b3b']} style={s.screen}>
      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 28 }]}>
        <Pressable onPress={() => router.back()} style={s.iconBtn}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>{game?.title ?? 'Game'}</Text>
          <Text style={s.headerSub}>SETTINGS</Text>
        </View>
        <Pressable onPress={() => {}} style={s.iconBtn}>
          <Feather name="globe" size={22} color="#fff" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 110 }]}
      >
        {/* ── Pick your questions ── */}
        <SectionTitle label="Pick your questions" />
        <View style={s.twoCol}>
          {/* Most Likely card */}
          <View style={s.questionCard}>
            <View style={s.cardToggleRow}>
              <Toggle value={mostLikely} onChange={setMostLikely} />
            </View>
            <Text style={s.questionTitle}>Most Likely</Text>
            <Text style={s.questionSub}>Expose your friends.</Text>
          </View>
          {/* Name 3 Things card */}
          <View style={[s.questionCard, s.questionCardOffset]}>
            <View style={s.cardToggleRow}>
              <Toggle value={name3} onChange={setName3} />
            </View>
            <Text style={s.questionTitle}>Name 3 Things</Text>
            <Text style={s.questionSub}>Think fast, name them.</Text>
          </View>
        </View>

        {/* ── Loser's Fate ── */}
        <SectionTitle label="Loser's fate" accent="#ff3366" />
        <View style={s.fateList}>
          {/* Punishments */}
          <View style={s.fateCard}>
            <View style={s.fateImageBox}>
              <Image source={require('@/assets/images/games/dare-or-drink.png')} style={s.fateImage} resizeMode="contain" />
            </View>
            <View style={s.fateCopy}>
              <View style={s.fateTopRow}>
                <View>
                  <Text style={s.fateTitle}>Punishments</Text>
                  <Text style={s.fateSub}>Pick your own penalty.</Text>
                </View>
                <Toggle value={punishments} onChange={setPunishments} />
              </View>
              <Pressable style={s.editBtn}>
                <Feather name="edit-2" size={14} color="#fff" />
                <Text style={s.editBtnText}>Edit punishment</Text>
              </Pressable>
            </View>
          </View>

          {/* Truth or Dare */}
          <View style={s.fateCard}>
            <View style={[s.fateImageBox, { backgroundColor: 'transparent' }]}>
              <Image source={require('@/assets/images/games/truth-or-drink.png')} style={s.fateImage} resizeMode="contain" />
            </View>
            <View style={s.fateCopy}>
              <View style={s.fateTopRow}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={s.fateTitle}>Truth or dare</Text>
                  <Text style={s.fateSub}>Challenges that match the theme.</Text>
                </View>
                <Toggle value={truthDare} onChange={setTruthDare} />
              </View>
            </View>
          </View>
        </View>

        {/* ── Round Length ── */}
        <View style={s.roundCard}>
          <View style={s.roundTop}>
            <View>
              <Text style={s.roundTitle}>Round Length</Text>
              <Text style={s.roundSub}>Bomb time: Pass it before it blows</Text>
            </View>
          </View>
          <View style={s.segmentRow}>
            {(['short', 'medium', 'long'] as const).map((seg) => (
              <Pressable
                key={seg}
                onPress={() => setRoundLength(seg)}
                style={[s.segment, roundLength === seg && s.segmentActive]}
              >
                <Text style={[s.segmentText, roundLength === seg && s.segmentTextActive]}>
                  {seg === 'short' ? '🔥 Short' : seg === 'medium' ? '⏱ Medium' : '🐢 Long'}
                </Text>
                {seg === 'medium' && <Text style={[s.segmentHint, roundLength === 'medium' && { color: '#fff' }]}>40–60s</Text>}
              </Pressable>
            ))}
          </View>
        </View>

        {/* ── Advanced Settings ── */}
        <Text style={s.advancedTitle}>Advanced Settings</Text>
        <View style={s.advancedCard}>
          {/* Flashing Light */}
          <View style={s.advRow}>
            <View style={s.advLeft}>
              <View style={s.advIcon}><Feather name="zap" size={18} color="rgba(255,255,255,0.6)" /></View>
              <Text style={s.advLabel}>Flashing Light</Text>
            </View>
            <Toggle value={flashingLight} onChange={setFlashingLight} />
          </View>
          <View style={s.divider} />
          {/* Sound Effects */}
          <View style={s.advRow}>
            <View style={s.advLeft}>
              <View style={s.advIcon}><Feather name="volume-2" size={18} color="rgba(255,255,255,0.6)" /></View>
              <Text style={s.advLabel}>Sound Effects</Text>
            </View>
            <Toggle value={soundFx} onChange={setSoundFx} />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Continue button */}
      <LinearGradient
        colors={['transparent', '#0a031d']}
        style={[s.bottomGradient, { paddingBottom: insets.bottom + 12 }]}
      >
        <Pressable onPress={handleContinue} style={({ pressed }) => [s.continueBtn, pressed && { opacity: 0.85 }]}>
          <Text style={s.continueBtnText}>CONTINUE</Text>
        </Pressable>
      </LinearGradient>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 8 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  headerSub: { color: 'rgba(185,178,230,0.7)', fontSize: 10, fontWeight: '800', letterSpacing: 2, marginTop: 2 },
  iconBtn: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 20, paddingTop: 18, gap: 20 },

  // Section heading
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 2 },
  accentBar: { width: 5, height: 24, borderRadius: 99 },
  sectionLabel: { color: '#fff', fontSize: 22, fontWeight: '800' },

  // Pick your questions
  twoCol: { flexDirection: 'row', gap: 14 },
  questionCard: { flex: 1, backgroundColor: '#22104d', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', minHeight: 130 },
  questionCardOffset: { marginTop: 20 },
  cardToggleRow: { alignItems: 'flex-end', marginBottom: 14 },
  questionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  questionSub: { color: 'rgba(163,154,182,1)', fontSize: 12, fontWeight: '600' },

  // Loser's fate
  fateList: { gap: 14 },
  fateCard: { backgroundColor: '#22104d', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', alignItems: 'center', gap: 16 },
  fateImageBox: { width: 90, height: 90, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  fateImage: { width: 80, height: 80, backgroundColor: '#FFFFFF' },
  fateCopy: { flex: 1 },
  fateTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  fateTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 4 },
  fateSub: { color: 'rgba(163,154,182,1)', fontSize: 13, fontWeight: '500' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, alignSelf: 'flex-start' },
  editBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Round Length
  roundCard: { backgroundColor: '#22104d', borderRadius: 24, padding: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  roundTop: { marginBottom: 20 },
  roundTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 4 },
  roundSub: { color: 'rgba(163,154,182,1)', fontSize: 13 },
  segmentRow: { flexDirection: 'row', gap: 8 },
  segment: { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  segmentActive: { backgroundColor: '#5c24ff', borderColor: '#5c24ff' },
  segmentText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '700', textAlign: 'center' },
  segmentTextActive: { color: '#fff' },
  segmentHint: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 3 },

  // Advanced Settings
  advancedTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  advancedCard: { backgroundColor: '#22104d', borderRadius: 24, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  advRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 16 },
  advLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  advIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  advLabel: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginHorizontal: 14 },

  // Toggle
  toggle: { width: 52, height: 30, borderRadius: 15, backgroundColor: '#331a70', justifyContent: 'center', padding: 3 },
  toggleOn: { backgroundColor: '#5c24ff' },
  thumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', alignSelf: 'flex-start' },
  thumbOn: { alignSelf: 'flex-end' },

  // Bottom CTA
  bottomGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 30 },
  continueBtn: { backgroundColor: '#5c24ff', borderRadius: 18, paddingVertical: 18, alignItems: 'center', shadowColor: '#5c24ff', shadowOpacity: 0.5, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  continueBtnText: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
});
