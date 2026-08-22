import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dsColor } from '@/constants/ds';
import { PREMIUM_BILLING_AVAILABLE, PREMIUM_COMPARISON, PREMIUM_FEATURES, PREMIUM_PLANS, PremiumPlan } from '@/config/premium';
import { usePres } from '@/context/PresContext';

const GRAD_TOP = '#3611D2';
const GRAD_BOT = '#140B4A';
const c = dsColor;

export default function Premium() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isPremium } = usePres();
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan['id']>('yearly');

  return (
    <LinearGradient colors={[GRAD_TOP, GRAD_BOT]} style={s.screen}>
      <ScrollView
        contentContainerStyle={[s.content, { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.topBar}>
          <Pressable testID="premium-back" onPress={() => router.back()} style={s.iconButton}>
            <Feather name="arrow-left" size={21} color={c.foreground} />
          </Pressable>
          {isPremium && (
            <View style={s.activePill}>
              <Feather name="check" size={13} color={c.foreground} />
              <Text style={s.activePillText}>ACTIVE</Text>
            </View>
          )}
        </View>

        <View style={s.hero}>
          <View style={s.heroMark}>
            <Feather name="star" size={25} color={c.foreground} />
          </View>
          <Text style={s.eyebrow}>PRES+</Text>
          <Text style={s.title}>Take your pres further.</Text>
          <Text style={s.subtitle}>More games. More questions. More chaos.</Text>
        </View>

        <View style={s.previewCard}>
          <View style={s.previewTop}>
            <View style={s.previewIcon}>
              <Feather name="zap" size={20} color={c.accent} />
            </View>
            <View style={s.previewHeading}>
              <Text style={s.previewEyebrow}>A LITTLE MORE UNHINGED</Text>
              <Text style={s.previewTitle}>The good stuff is waiting.</Text>
            </View>
            <View style={s.plusBadge}><Text style={s.plusBadgeText}>PRES+</Text></View>
          </View>
          <View style={s.blurredPrompt}>
            <Text style={s.blurredPromptText}>Who here would cause the most chaos if they got famous?</Text>
            <View style={s.blurVeil} />
            <View style={s.revealLabel}>
              <Feather name="lock" size={14} color={c.foreground} />
              <Text style={s.revealText}>UNLOCK TO REVEAL</Text>
            </View>
          </View>
        </View>

        <Text style={s.sectionTitle}>WHAT'S INCLUDED</Text>
        <View style={s.featureList}>
          {PREMIUM_FEATURES.map((feature) => (
            <View key={feature.id} style={s.featureRow}>
              <View style={s.featureIcon}>
                <Feather name={feature.icon as any} size={18} color={c.accent} />
              </View>
              <View style={s.featureCopy}>
                <Text style={s.featureTitle}>{feature.title}</Text>
                <Text style={s.featureDescription}>{feature.description}</Text>
              </View>
              {feature.availability === 'available'
                ? <Feather name="check" size={18} color={c.accent} />
                : <View style={s.soonBadge}><Text style={s.soonBadgeText}>SOON</Text></View>}
            </View>
          ))}
        </View>
        <Text style={s.rolloutNote}>New PRES+ tools are clearly marked as they roll out. The free experience stays fully playable.</Text>

        <Text style={s.sectionTitle}>PICK YOUR PLAN</Text>
        <View style={s.planList}>
          {PREMIUM_PLANS.map((plan) => {
            const selected = selectedPlan === plan.id;
            return (
              <Pressable
                key={plan.id}
                testID={`premium-plan-${plan.id}`}
                onPress={() => setSelectedPlan(plan.id)}
                style={[s.plan, selected && s.planSelected]}
              >
                <View style={[s.radio, selected && s.radioSelected]}>
                  {selected && <View style={s.radioDot} />}
                </View>
                <View style={s.planCopy}>
                  <View style={s.planLabelRow}>
                    <Text style={s.planLabel}>{plan.label}</Text>
                    {PREMIUM_BILLING_AVAILABLE && plan.value && <Text style={s.valueBadge}>{plan.value}</Text>}
                  </View>
                  <Text style={s.planPrice}>{plan.price} <Text style={s.planCadence}>{plan.cadence}</Text></Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text style={s.sectionTitle}>FREE VS PRES+</Text>
        <View style={s.comparisonCard}>
          <View style={s.comparisonColumn}>
            <Text style={s.comparisonHeading}>FREE</Text>
            {PREMIUM_COMPARISON.free.map((item) => (
              <View key={item} style={s.comparisonRow}>
                <Feather name="check" size={14} color="rgba(255,255,255,0.55)" />
                <Text style={s.comparisonText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={s.comparisonDivider} />
          <View style={s.comparisonColumn}>
            <Text style={[s.comparisonHeading, { color: c.accent }]}>PRES+</Text>
            {PREMIUM_COMPARISON.plus.map((item) => (
              <View key={item} style={s.comparisonRow}>
                <Feather name="check" size={14} color={c.accent} />
                <Text style={s.comparisonText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          testID="premium-unlock"
          disabled={!PREMIUM_BILLING_AVAILABLE && !isPremium}
          style={({ pressed }) => [s.primaryButton, !PREMIUM_BILLING_AVAILABLE && !isPremium && s.primaryButtonUnavailable, pressed && PREMIUM_BILLING_AVAILABLE && s.pressed]}
        >
          <Text style={s.primaryButtonText}>{isPremium ? 'PRES+ IS ACTIVE' : PREMIUM_BILLING_AVAILABLE ? 'UNLOCK PRES+' : 'PRES+ IS COMING SOON'}</Text>
          <Feather name={isPremium ? 'check' : 'clock'} size={19} color={c.foreground} />
        </Pressable>
        <Text style={s.cancelText}>{PREMIUM_BILLING_AVAILABLE ? 'Cancel anytime.' : 'Subscriptions are not available yet.'}</Text>
        <Text style={s.storeNote}>{PREMIUM_BILLING_AVAILABLE ? 'Subscriptions are handled securely through the App Store or Google Play.' : 'Pricing will appear here once secure store billing is ready.'}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  topBar: { minHeight: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconButton: { width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  activePill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 99, backgroundColor: 'rgba(183,247,0,0.18)', borderWidth: 1, borderColor: 'rgba(183,247,0,0.5)' },
  activePillText: { color: c.foreground, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  hero: { paddingTop: 28, paddingBottom: 26 },
  heroMark: { width: 58, height: 58, borderRadius: 20, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  eyebrow: { color: c.accent, fontSize: 13, fontWeight: '900', letterSpacing: 2.4 },
  title: { color: c.foreground, fontSize: 38, lineHeight: 44, fontWeight: '900', marginTop: 10, letterSpacing: -0.7 },
  subtitle: { color: 'rgba(255,255,255,0.68)', fontSize: 16, lineHeight: 23, marginTop: 10 },
  previewCard: { borderRadius: 25, padding: 16, backgroundColor: 'rgba(255,255,255,0.11)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.19)', marginBottom: 28 },
  previewTop: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 15 },
  previewIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,107,74,0.18)', alignItems: 'center', justifyContent: 'center' },
  previewHeading: { flex: 1 },
  previewEyebrow: { color: 'rgba(255,255,255,0.58)', fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  previewTitle: { color: c.foreground, fontSize: 16, fontWeight: '800', marginTop: 4 },
  plusBadge: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, backgroundColor: c.accent },
  plusBadgeText: { color: c.foreground, fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  blurredPrompt: { minHeight: 118, borderRadius: 18, backgroundColor: c.background, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', padding: 22, position: 'relative' },
  blurredPromptText: { color: c.foreground, fontSize: 20, lineHeight: 27, fontWeight: '800', textAlign: 'center', opacity: 0.22 },
  blurVeil: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20,11,74,0.47)' },
  revealLabel: { position: 'absolute', flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(255,107,74,0.95)', borderRadius: 99, paddingHorizontal: 13, paddingVertical: 9 },
  revealText: { color: c.foreground, fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  sectionTitle: { color: 'rgba(255,255,255,0.68)', fontSize: 11, fontWeight: '900', letterSpacing: 1.8, marginBottom: 12, marginTop: 2 },
  featureList: { gap: 9, marginBottom: 27 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 69, borderRadius: 18, paddingHorizontal: 13, paddingVertical: 11, backgroundColor: 'rgba(255,255,255,0.085)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)' },
  featureIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,107,74,0.15)', alignItems: 'center', justifyContent: 'center' },
  featureCopy: { flex: 1 },
  featureTitle: { color: c.foreground, fontSize: 13, fontWeight: '900', letterSpacing: 0.3 },
  featureDescription: { color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 17, marginTop: 3 },
  soonBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.12)' },
  soonBadgeText: { color: 'rgba(255,255,255,0.64)', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  rolloutNote: { color: 'rgba(255,255,255,0.47)', fontSize: 11, lineHeight: 16, marginTop: -16, marginBottom: 27, paddingHorizontal: 2 },
  planList: { gap: 10, marginBottom: 27 },
  plan: { flexDirection: 'row', alignItems: 'center', gap: 13, minHeight: 76, paddingHorizontal: 15, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)' },
  planSelected: { backgroundColor: 'rgba(255,107,74,0.16)', borderColor: c.accent, borderWidth: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: c.accent },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: c.accent },
  planCopy: { flex: 1 },
  planLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  planLabel: { color: c.foreground, fontSize: 12, fontWeight: '900', letterSpacing: 1.3 },
  valueBadge: { color: c.foreground, backgroundColor: 'rgba(183,247,0,0.78)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5, fontSize: 8, fontWeight: '900', letterSpacing: 0.4 },
  planPrice: { color: c.foreground, fontSize: 18, fontWeight: '900', marginTop: 6 },
  planCadence: { color: 'rgba(255,255,255,0.56)', fontSize: 12, fontWeight: '600' },
  comparisonCard: { flexDirection: 'row', borderRadius: 20, padding: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', marginBottom: 28 },
  comparisonColumn: { flex: 1, gap: 9 },
  comparisonDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginHorizontal: 12 },
  comparisonHeading: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 3 },
  comparisonRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  comparisonText: { color: 'rgba(255,255,255,0.72)', fontSize: 11, lineHeight: 15, flex: 1 },
  primaryButton: { minHeight: 58, borderRadius: 18, backgroundColor: c.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 11, shadowColor: c.accent, shadowOpacity: 0.38, shadowRadius: 17, shadowOffset: { width: 0, height: 7 }, elevation: 8 },
  primaryButtonUnavailable: { backgroundColor: 'rgba(255,255,255,0.16)', shadowOpacity: 0, elevation: 0 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  primaryButtonText: { color: c.foreground, fontSize: 15, fontWeight: '900', letterSpacing: 1.1 },
  cancelText: { color: 'rgba(255,255,255,0.62)', textAlign: 'center', fontSize: 12, marginTop: 13 },
  storeNote: { color: 'rgba(255,255,255,0.36)', textAlign: 'center', fontSize: 10, lineHeight: 15, marginTop: 7, paddingHorizontal: 20 },
});