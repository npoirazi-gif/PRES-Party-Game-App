import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dsColor } from '@/constants/ds';
import { vibes } from '@/data/games';
import { usePres } from '@/context/PresContext';

// Art-directed gradient stops — intentionally not part of the token set
const GRAD_TOP = '#3611D2';
const GRAD_BOT = '#140B4A';

const c = dsColor;

export default function Vibes() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { vibe, setVibe } = usePres();

  return (
    <LinearGradient colors={[GRAD_TOP, GRAD_BOT]} style={s.screen}>
      <ScrollView
        contentContainerStyle={[s.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 30 }]}
      >
        <Pressable onPress={() => router.back()} style={s.back}>
          <Feather name="arrow-left" size={20} color={c.foreground} />
        </Pressable>
        <Text style={s.kicker}>PRES / START</Text>
        <Text style={s.title}>WHAT'S THE VIBE?</Text>
        <Text style={s.sub}>Tell us what kind of pres you're having.</Text>
        <View style={s.list}>
          {vibes.map(item => (
            <Pressable
              key={item}
              onPress={() => { setVibe(item); router.push({ pathname: '/recommendations', params: { vibe: item } }); }}
              style={[s.option, item === vibe && s.selected]}
            >
              <Text style={s.optionText}>{item}</Text>
              <Feather name="chevron-right" size={18} color={item === vibe ? c.accent : 'rgba(255,255,255,0.45)'} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22 },
  back: { width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  kicker: { color: c.accent, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: c.foreground, fontSize: 34, fontWeight: '800', marginTop: 8 },
  sub: { color: 'rgba(255,255,255,0.62)', fontSize: 15, marginTop: 8, marginBottom: 24 },
  list: { gap: 11 },
  option: { minHeight: 66, borderRadius: 18, paddingHorizontal: 18, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selected: { borderColor: c.accent, backgroundColor: 'rgba(255,107,74,0.18)' },
  optionText: { color: c.foreground, fontSize: 16, fontWeight: '700' },
});
