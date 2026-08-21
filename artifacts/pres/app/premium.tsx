import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dsColor } from '@/constants/ds';

// Art-directed gradient stops — intentionally not part of the token set
const GRAD_TOP = '#3611D2';
const GRAD_BOT = '#140B4A';

const c = dsColor;

export default function Premium() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={[GRAD_TOP, GRAD_BOT]} style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 30 }]}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Feather name="arrow-left" size={20} color={c.foreground} />
        </Pressable>
        <View style={styles.mark}><Feather name="star" size={26} color={c.foreground} /></View>
        <Text style={styles.kicker}>PRES PREMIUM</Text>
        <Text style={styles.title}>More games. More chaos.</Text>
        <Text style={styles.sub}>Unlock the full PRES experience for the nights you want to remember.</Text>
        {['Exclusive game packs', 'No interruptions', 'Fresh questions every week'].map(item => (
          <View key={item} style={styles.feature}>
            <Feather name="check" size={17} color={c.accent} />
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
        <Pressable onPress={() => router.back()} style={styles.primary}>
          <Text style={styles.primaryText}>COMING SOON</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22 },
  back: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 46 },
  mark: { width: 64, height: 64, borderRadius: 22, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  kicker: { color: c.accent, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: c.foreground, fontSize: 38, lineHeight: 44, fontWeight: '800', marginTop: 10 },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 22, marginTop: 10, marginBottom: 28 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  featureText: { color: c.foreground, fontSize: 16, fontWeight: '700' },
  primary: { backgroundColor: c.accent, borderRadius: 16, alignItems: 'center', paddingVertical: 16, marginTop: 22 },
  primaryText: { color: c.foreground, fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});