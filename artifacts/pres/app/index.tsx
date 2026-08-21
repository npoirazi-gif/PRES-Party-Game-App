import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { games } from '@/data/games';
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
  const { addRecent } = usePres();

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

        {/* Pick a Game — pinned to bottom */}
        <View style={s.pickSection}>
          <View style={s.pickHeader}>
            <Text style={s.sectionKicker}>PICK A GAME</Text>
            <Pressable onPress={() => router.push('/library')} style={s.seeAll}>
              <Text style={s.seeAllText}>SEE ALL</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.gameScroll}>
            {games.map(game => (
              <Pressable
                key={game.id}
                onPress={() => { addRecent(game.id); router.push({ pathname: '/game-settings', params: { id: game.id } }); }}
                style={({ pressed }) => [s.gameCard, pressed && s.pressed]}
              >
                <View style={s.gameSticker}>
                  {gameImages[game.id] && (
                    <Image source={gameImages[game.id]} style={s.gameStickerImg} resizeMode="contain" />
                  )}
                </View>
                <Text style={s.gameCardName} numberOfLines={2}>{game.title}</Text>
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
  pickSection: { paddingTop: 8 },
  pickHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionKicker: { color: c.text, fontSize: 13, fontWeight: '800', letterSpacing: 1.7 },
  seeAll: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 99, paddingHorizontal: 12, paddingVertical: 5 },
  seeAllText: { color: c.text, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  gameScroll: { gap: 10, paddingBottom: 4 },
  gameCard: { width: 88, alignItems: 'center' },
  gameSticker: { width: 88, height: 88, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 7 },
  gameStickerImg: { width: 80, height: 80, backgroundColor: '#FFFFFF' },
  gameCardName: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '700', textAlign: 'center', lineHeight: 13 },
});
