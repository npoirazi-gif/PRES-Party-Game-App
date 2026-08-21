import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Art-directed gradient stops — intentionally not part of the token set
const GRAD_BG_TOP = '#180353'; // deep cosmic violet
const GRAD_BG_BOT = '#0c0022'; // near-black space
const COLOR_PLAY_BTN = '#3b07f8'; // deep indigo play CTA

const { height: SCREEN_H } = Dimensions.get('window');
const CARD_H = Math.min(SCREEN_H * 0.65, 500);

type ThemeKey = 'casual' | 'crazy' | 'flirty' | 'sexy' | 'edgy';

const THEMES: Array<{
  key: ThemeKey;
  label: string;
  desc: string;
  colors: [string, string];
  image: any;
}> = [
  {
    key: 'casual',
    label: 'CASUAL',
    desc: '1200+ questions for any occasion. Always on.',
    colors: ['#34d399', '#059669'],
    image: require('@/assets/images/games/categories.png'),
  },
  {
    key: 'crazy',
    label: 'CRAZY',
    desc: "A deck of questions that'll twist your mind!",
    colors: ['#2dd4bf', '#0891b2'],
    image: require('@/assets/images/games/bad-decisions.png'),
  },
  {
    key: 'flirty',
    label: 'FLIRTY',
    desc: "Let's turn up the cheeky charm!",
    colors: ['#fbbf24', '#f97316'],
    image: require('@/assets/images/games/would-you-rather.png'),
  },
  {
    key: 'sexy',
    label: 'SEXY',
    desc: 'Ready for a bit of spice?',
    colors: ['#fb7185', '#e11d48'],
    image: require('@/assets/images/games/truth-or-drink.png'),
  },
  {
    key: 'edgy',
    label: 'EDGY',
    desc: 'Get ready to test those limits!',
    colors: ['#818cf8', '#7c3aed'],
    image: require('@/assets/images/games/paranoia.png'),
  },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <Pressable onPress={() => onChange(!value)} style={[s.toggle, value && s.toggleOn]}>
      <View style={[s.thumb, value && s.thumbOn]} />
    </Pressable>
  );
}

export default function Themes() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, roundLength } = useLocalSearchParams<{ id?: string; roundLength?: string }>();

  const [enabled, setEnabled] = useState<Record<ThemeKey, boolean>>({
    casual: true,
    crazy: true,
    flirty: true,
    sexy: false,
    edgy: false,
  });

  function toggle(key: ThemeKey) {
    setEnabled(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function handlePlay() {
    if (id) {
      router.push({ pathname: '/game/[id]', params: { id, roundLength: roundLength ?? 'medium' } });
    } else {
      router.push('/library');
    }
  }

  return (
    <LinearGradient colors={[GRAD_BG_TOP, GRAD_BG_BOT]} style={s.screen}>
      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 14 }]}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </Pressable>
      </View>

      <Text style={s.pageTitle}>Pick your themes</Text>

      {/* Horizontal carousel */}
      <ScrollView
        horizontal
        pagingEnabled={false}
        snapToInterval={SCREEN_H * 0.82 * 0.75}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.carousel}
        style={s.carouselScroll}
      >
        {THEMES.map((theme) => (
          <LinearGradient
            key={theme.key}
            colors={theme.colors}
            style={[s.card, { height: CARD_H }]}
          >
            {/* Background sticker (blurred-style large) */}
            <Image
              source={theme.image}
              style={s.cardBgImage}
              resizeMode="contain"
              blurRadius={3}
            />
            {/* Foreground sticker */}
            <Image
              source={theme.image}
              style={s.cardFgImage}
              resizeMode="contain"
            />

            {/* Bottom content */}
            <View style={s.cardBottom}>
              <Text style={s.cardTitle}>{theme.label}</Text>
              <View style={s.cardDescRow}>
                <Text style={s.cardDesc}>{theme.desc}</Text>
                <Toggle value={enabled[theme.key]} onChange={() => toggle(theme.key)} />
              </View>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Play button */}
      <LinearGradient
        colors={['transparent', GRAD_BG_BOT]}
        style={[s.bottomBar, { paddingBottom: insets.bottom + 12 }]}
      >
        <Pressable onPress={handlePlay} style={({ pressed }) => [s.playBtn, pressed && { opacity: 0.85 }]}>
          <Feather name="play" size={20} color="#fff" />
          <Text style={s.playBtnText}>Play game</Text>
        </Pressable>
      </LinearGradient>
    </LinearGradient>
  );
}

const W = Dimensions.get('window').width;
const CARD_W = Math.min(W * 0.78, 300);

const s = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 4 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  pageTitle: { color: '#fff', fontSize: 34, fontWeight: '900', paddingHorizontal: 24, marginTop: 10, marginBottom: 4 },

  carouselScroll: { flexGrow: 0 },
  carousel: { paddingHorizontal: 24, gap: 18, alignItems: 'center', paddingBottom: 16 },

  card: { width: CARD_W, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', position: 'relative', justifyContent: 'flex-end', padding: 22 },
  cardBgImage: { position: 'absolute', top: -20, right: -30, width: '110%', height: '70%', opacity: 0.5 },
  cardFgImage: { position: 'absolute', top: 16, right: -16, width: 220, height: 220, backgroundColor: 'transparent' },
  cardBottom: { zIndex: 10 },
  cardTitle: { color: 'rgba(255,255,255,0.95)', fontSize: 64, fontWeight: '900', lineHeight: 68, marginBottom: 16, letterSpacing: -2 },
  cardDescRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.2)', padding: 14, borderRadius: 18, gap: 12 },
  cardDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '500', flex: 1, lineHeight: 18 },

  toggle: { width: 52, height: 30, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 3, flexShrink: 0 },
  toggleOn: { backgroundColor: 'rgba(255,255,255,0.9)' },
  thumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.7)', alignSelf: 'flex-start' },
  thumbOn: { alignSelf: 'flex-end', backgroundColor: '#333' },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 24, paddingTop: 32 },
  playBtn: { backgroundColor: COLOR_PLAY_BTN, borderRadius: 999, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', shadowColor: COLOR_PLAY_BTN, shadowOpacity: 0.5, shadowRadius: 24, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  playBtnText: { color: '#fff', fontSize: 22, fontWeight: '800' },
});
