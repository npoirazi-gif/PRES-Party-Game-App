import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { games, Game } from '@/data/games';
import { usePres } from '@/context/PresContext';

const gameImages: Record<string, any> = {
  'most-likely-to':    require('@/assets/images/games/most-likely-to.png'),
  'never-have-i-ever': require('@/assets/images/games/never-have-i-ever.png'),
  'would-you-rather':  require('@/assets/images/games/would-you-rather.png'),
  'id-game':           require('@/assets/images/games/id-game.png'),
  'back-to-back':      require('@/assets/images/games/back-to-back.png'),
  'paranoia':          require('@/assets/images/games/paranoia.png'),
  'truth-or-drink':    require('@/assets/images/games/truth-or-drink.png'),
  'hot-seat':          require('@/assets/images/games/hot-seat.png'),
  'exposed':           require('@/assets/images/games/exposed.png'),
  '5-seconds':         require('@/assets/images/games/5-seconds.png'),
  'categories':        require('@/assets/images/games/categories.png'),
  'receipts':          require('@/assets/images/games/receipts.png'),
  'bad-decisions':     require('@/assets/images/games/bad-decisions.png'),
  'red-green-flag':    require('@/assets/images/games/red-green-flag.png'),
  'drink-if':          require('@/assets/images/games/drink-if.png'),
  'dare-or-drink':     require('@/assets/images/games/dare-or-drink.png'),
};

const c = colors.light;
const filters = ['ALL', 'PARTY CLASSIC', 'SPICY', 'CASUAL'];
const descriptions: Record<string, string> = {
  'never-have-i-ever': 'Expose your past.', 'most-likely-to': 'Point some fingers.', 'would-you-rather': 'Tough choices.', 'id-game': 'Who are you?',
  'back-to-back': 'Couples test.', 'paranoia': 'Whisper secrets.', 'truth-or-drink': 'Spill or sip.', 'hot-seat': 'Under pressure.',
  exposed: 'Nowhere to hide.', '5-seconds': 'Think fast.', categories: 'Name them all.', receipts: 'Bring the proof.',
  'bad-decisions': 'Own up to it.', 'red-green-flag': 'Dealbreakers.', 'drink-if': 'Just do it.', 'dare-or-drink': 'No backing down.'
};
const labels: Record<string, string> = { 'never-have-i-ever': 'PARTY CLASSIC', 'most-likely-to': 'SPICY', 'would-you-rather': 'CASUAL', 'id-game': 'NEW', 'paranoia': 'SPICY', 'truth-or-drink': 'PARTY CLASSIC', '5-seconds': 'CASUAL', receipts: 'SPICY', 'drink-if': 'PARTY CLASSIC', 'dare-or-drink': 'SPICY' };

export default function Library() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('ALL');
  const { addRecent } = usePres();
  const shown = useMemo(() => filter === 'ALL' ? games : games.filter((game) => {
    if (filter === 'PARTY CLASSIC') return labels[game.id] === filter;
    if (filter === 'SPICY') return labels[game.id] === filter || game.heat === 'Spicy' || game.heat === 'Inferno';
    return labels[game.id] === filter || game.heat === 'Mild' || game.heat === 'Medium';
  }), [filter]);
  return <LinearGradient colors={['#3611D2', '#140B4A']} style={styles.screen}>
    <View style={styles.glowTop} /><View style={styles.glowBottom} />
    <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 30 }]} showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => router.back()} style={styles.back}><Feather name="arrow-left" size={22} color={c.text} /></Pressable>
      <View style={styles.heading}><Text style={styles.title}>Games</Text><Text style={styles.sub}>Select a game to start the party.</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.activeFilter]}><Text style={[styles.filterText, filter === item && styles.activeFilterText]}>{item}</Text></Pressable>)}</ScrollView>
      <View style={styles.grid}>{shown.map((game, index) => <GameCard key={game.id} game={game} index={index} onPress={() => { addRecent(game.id); router.push({ pathname: '/game/[id]', params: { id: game.id } }); }} />)}</View>
    </ScrollView>
  </LinearGradient>;
}

function GameCard({ game, index, onPress }: { game: Game; index: number; onPress: () => void }) {
  const label = labels[game.id] ?? (index % 3 === 0 ? 'PARTY CLASSIC' : undefined);
  const badgeColor = label === 'SPICY' ? '#FF4B89' : label === 'CASUAL' ? 'rgba(255,255,255,0.2)' : '#B7F700';
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
    <View style={styles.stickerPanel}>
      {gameImages[game.id]
        ? <Image source={gameImages[game.id]} style={styles.stickerImg} resizeMode="contain" />
        : <View style={[styles.stickerFallback, { backgroundColor: game.color }]}><Feather name="zap" size={34} color="#140B4A" /></View>}
    </View>
    <Text style={styles.gameTitle} numberOfLines={1}>{game.title === 'Never Have I Ever' ? 'Never Have I' : game.title}</Text>
    <Text style={styles.gameDescription}>{descriptions[game.id] ?? game.short}</Text>
    {label && <View style={[styles.badge, { backgroundColor: badgeColor }]}><Text style={[styles.badgeText, label === 'PARTY CLASSIC' && styles.limeText]}>{label}</Text></View>}
  </Pressable>;
}

const styles = StyleSheet.create({ screen: { flex: 1, overflow: 'hidden' }, content: { paddingHorizontal: 24 }, glowTop: { position: 'absolute', width: 230, height: 230, borderRadius: 120, backgroundColor: 'rgba(255,75,137,0.16)', top: -80, left: -80 }, glowBottom: { position: 'absolute', width: 230, height: 230, borderRadius: 120, backgroundColor: 'rgba(183,247,0,0.13)', bottom: -80, right: -80 }, back: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 22 }, heading: { marginBottom: 2 }, title: { color: c.text, fontSize: 38, lineHeight: 45, fontWeight: '800' }, sub: { color: 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 4 }, filters: { gap: 8, paddingVertical: 22 }, filter: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }, activeFilter: { backgroundColor: c.text, borderColor: c.text }, filterText: { color: c.text, fontSize: 10, fontWeight: '800', letterSpacing: 0.7 }, activeFilterText: { color: '#140B4A' }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 }, card: { width: '47.8%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 24, padding: 10, alignItems: 'center', backgroundColor: '#140B4A', minHeight: 235, shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 5 }, pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] }, stickerPanel: { width: '100%', height: 130, backgroundColor: '#FFFFFF', borderRadius: 14, marginBottom: 10, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, stickerImg: { width: 112, height: 112, backgroundColor: '#FFFFFF' }, stickerFallback: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center' }, gameTitle: { color: c.text, fontSize: 16, fontWeight: '800', textAlign: 'center', marginBottom: 3 }, gameDescription: { color: 'rgba(255,255,255,0.6)', fontSize: 11, textAlign: 'center', marginBottom: 9 }, badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 }, badgeText: { color: c.text, fontSize: 9, fontWeight: '800', letterSpacing: 0.7 }, limeText: { color: '#141F00' } });