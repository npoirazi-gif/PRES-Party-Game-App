import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dsColor } from '@/constants/ds';
import { PREMIUM_BILLING_AVAILABLE, premiumPreviewFor } from '@/config/premium';
import { usePres } from '@/context/PresContext';

const GRAD_TOP = '#3611D2';
const GRAD_BOT = '#140B4A';
const c = dsColor;

export default function PremiumPreview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { feature } = useLocalSearchParams<{ feature?: string }>();
  const { isPremium } = usePres();
  const preview = premiumPreviewFor(feature);

  return (
    <LinearGradient colors={[GRAD_TOP, GRAD_BOT]} style={s.screen}>
      <ScrollView contentContainerStyle={[s.content, { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 22 }]} showsVerticalScrollIndicator={false}>
        <Pressable testID="premium-preview-back" onPress={() => router.back()} style={s.back}>
          <Feather name="x" size={21} color={c.foreground} />
        </Pressable>

        <View style={s.center}>
          <View style={s.mark}><Feather name={preview.icon as any} size={29} color={c.foreground} /></View>
          <Text style={s.eyebrow}>{preview.eyebrow}</Text>
          <Text style={s.title}>{isPremium ? 'YOU ARE IN.' : preview.title}</Text>
          <Text style={s.description}>{isPremium ? 'This PRES+ feature is already included with your access.' : preview.description}</Text>

          <View style={s.promptCard}>
            <View style={s.promptGlow} />
            <Feather name="lock" size={20} color={c.accent} />
            <Text style={s.prompt}>{preview.prompt}</Text>
            {!isPremium && <View style={s.promptVeil} />}
            {!isPremium && <Text style={s.promptLabel}>UNLOCK PRES+ TO REVEAL</Text>}
          </View>

          <Pressable
            testID="premium-preview-cta"
            onPress={() => isPremium ? router.back() : router.push('/premium')}
            style={({ pressed }) => [s.primary, pressed && s.pressed]}
          >
            <Text style={s.primaryText}>{isPremium ? 'BACK TO PRES' : PREMIUM_BILLING_AVAILABLE ? 'UNLOCK PRES+' : 'SEE PRES+ DETAILS'}</Text>
            <Feather name={isPremium ? 'arrow-left' : 'arrow-right'} size={18} color={c.foreground} />
          </Pressable>
          {!isPremium && (
            <>
              {!PREMIUM_BILLING_AVAILABLE && <Text style={s.availability}>Subscriptions are not available yet.</Text>}
              <Pressable testID="premium-preview-dismiss" onPress={() => router.back()} style={s.secondary}>
                <Text style={s.secondaryText}>Maybe later</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 20 },
  back: { width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 30 },
  mark: { width: 76, height: 76, borderRadius: 26, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 23 },
  eyebrow: { color: c.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.8 },
  title: { color: c.foreground, fontSize: 31, lineHeight: 38, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  description: { color: 'rgba(255,255,255,0.68)', fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 315, marginTop: 10 },
  promptCard: { width: '100%', minHeight: 190, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', padding: 28, marginTop: 30, overflow: 'hidden', position: 'relative' },
  promptGlow: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,107,74,0.16)', top: -70, right: -40 },
  prompt: { color: c.foreground, fontSize: 22, lineHeight: 30, fontWeight: '800', textAlign: 'center', marginTop: 13 },
  promptVeil: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20,11,74,0.64)' },
  promptLabel: { position: 'absolute', color: c.foreground, backgroundColor: c.accent, borderRadius: 99, paddingHorizontal: 12, paddingVertical: 9, fontSize: 9, fontWeight: '900', letterSpacing: 0.7 },
  primary: { width: '100%', minHeight: 57, borderRadius: 18, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginTop: 28 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  primaryText: { color: c.foreground, fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  availability: { color: 'rgba(255,255,255,0.48)', fontSize: 11, marginTop: 12 },
  secondary: { paddingVertical: 17, paddingHorizontal: 24 },
  secondaryText: { color: 'rgba(255,255,255,0.62)', fontSize: 14, fontWeight: '700' },
});