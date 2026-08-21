import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';

const c = colors.light;

type MenuItem = { label: string; sub: string; icon: any; route?: string; value?: string };

const MENU: MenuItem[] = [
  { label: 'Game Setup',      sub: 'Questions, punishments & round length', icon: 'sliders',   route: '/game-settings' },
  { label: 'Pick Themes',     sub: 'Casual, Crazy, Flirty, Sexy, Edgy',    icon: 'layers',    route: '/themes' },
  { label: 'Language',        sub: 'English',                               icon: 'globe',     value: 'English' },
  { label: 'Sound Effects',   sub: 'On',                                    icon: 'volume-2',  value: 'On' },
  { label: 'Content Intensity', sub: 'All levels',                          icon: 'thermometer', value: 'All levels' },
  { label: 'About PRES',      sub: 'Version 1.0',                           icon: 'info',      value: 'v1.0' },
];

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#3611D2', '#140B4A']} style={s.screen}>
      <ScrollView contentContainerStyle={[s.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 30 }]}>
        <Pressable onPress={() => router.back()} style={s.back}>
          <Feather name="arrow-left" size={20} color={c.text} />
        </Pressable>
        <Text style={s.title}>Settings</Text>
        <Text style={s.sub}>Make PRES work for your group.</Text>

        {MENU.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => item.route ? router.push(item.route as any) : undefined}
            style={({ pressed }) => [s.row, pressed && item.route && s.rowPressed]}
          >
            <View style={s.rowLeft}>
              <View style={s.rowIcon}>
                <Feather name={item.icon} size={18} color="rgba(255,255,255,0.7)" />
              </View>
              <View>
                <Text style={s.rowTitle}>{item.label}</Text>
                <Text style={s.rowSub}>{item.sub}</Text>
              </View>
            </View>
            <Feather
              name={item.route ? 'arrow-right' : 'chevron-right'}
              size={18}
              color={item.route ? c.accent : 'rgba(255,255,255,0.35)'}
            />
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22 },
  back: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  title: { color: c.text, fontSize: 38, fontWeight: '800' },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 15, marginTop: 6, marginBottom: 28 },
  row: { minHeight: 72, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  rowPressed: { opacity: 0.75 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  rowIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  rowTitle: { color: c.text, fontSize: 16, fontWeight: '700' },
  rowSub: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 3 },
});
