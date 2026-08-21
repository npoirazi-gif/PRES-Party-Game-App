import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { vibes } from '@/data/games';
import { usePres } from '@/context/PresContext';

const c = colors.light;

function IconButton({ name, onPress }: { name: any; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.icon, pressed && s.pressed]}>
      <Feather name={name} size={23} color={c.text} />
    </Pressable>
  );
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { vibe, setVibe } = usePres();

  return (
    <LinearGradient colors={['#3611D2', '#140B4A']} style={s.screen}>
      <View style={[s.inner, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 28 }]}>

        {/* Top utility bar */}
        <View style={s.header}>
          <View style={s.left}>
            <IconButton name="globe" onPress={() => {}} />
            <Pressable onPress={() => router.push('/premium')} style={s.premium}>
              <Text style={s.premiumText}>Premium</Text>
            </Pressable>
          </View>
          <View style={s.left}>
            <IconButton name="maximize" onPress={() => {}} />
            <IconButton name="settings" onPress={() => router.push('/settings')} />
          </View>
        </View>

        {/* PRES logo — centred in remaining space */}
        <View style={s.entry}>
          <Pressable onPress={() => router.push('/library')} style={({ pressed }) => [pressed && s.logoPressed]}>
            <Text style={s.logo}>PRES</Text>
          </Pressable>
          <Text style={s.tap}>TAP TO ENTER LIBRARY</Text>
        </View>

        {/* Vibe picker — pinned to bottom */}
        <View style={s.vibeSection}>
          <Text style={s.sectionKicker}>WHAT'S THE VIBE?</Text>
          <Text style={s.subtle}>Tell us what kind of pres you're having.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.vibeScroll}>
            {vibes.map(item => (
              <Pressable
                key={item}
                onPress={() => { setVibe(item); router.push({ pathname: '/recommendations', params: { vibe: item } }); }}
                style={({ pressed }) => [s.vibeCard, item === vibe && s.selected, pressed && s.pressed]}
              >
                <Text style={s.vibeText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 16, flexDirection: 'column' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  premium: { height: 48, paddingHorizontal: 18, borderRadius: 14, borderWidth: 2, borderColor: c.accent, backgroundColor: 'rgba(20,11,74,0.45)', justifyContent: 'center' },
  premiumText: { color: c.text, fontWeight: '800', fontSize: 16 },
  pressed: { opacity: 0.78 },
  logoPressed: { transform: [{ scale: 0.96 }], opacity: 0.8 },
  entry: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { color: c.text, fontSize: 82, fontWeight: '800', letterSpacing: 7, textShadowColor: 'rgba(255,255,255,0.18)', textShadowRadius: 18 },
  tap: { color: 'rgba(255,255,255,0.58)', fontSize: 13, fontWeight: '800', letterSpacing: 2, marginTop: 18 },
  vibeSection: { paddingTop: 8 },
  sectionKicker: { color: c.text, fontSize: 13, fontWeight: '800', letterSpacing: 1.7, marginBottom: 4 },
  subtle: { color: 'rgba(255,255,255,0.58)', fontSize: 13 },
  vibeScroll: { gap: 10, paddingTop: 14, paddingBottom: 4 },
  vibeCard: { width: 128, height: 80, borderRadius: 14, backgroundColor: 'rgba(20,11,74,0.52)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  selected: { borderColor: c.accent },
  vibeText: { color: c.text, fontSize: 13, fontWeight: '800', textAlign: 'center' },
});
