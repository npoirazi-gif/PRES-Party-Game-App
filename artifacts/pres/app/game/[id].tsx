import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import colors from '@/constants/colors';
import { gameById } from '@/data/games';
import { usePres } from '@/context/PresContext';

const c = colors.light;

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = gameById(id);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getPromptIndex, resetSession } = usePres();
  const [started, setStarted] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [timer, setTimer] = useState(5);
  const [names, setNames] = useState(['', '']);
  const [revealed, setRevealed] = useState(false);
  const prompt = game.prompts[promptIndex % game.prompts.length];
  const choice = game.choices?.[promptIndex % game.choices.length];
  const poolSize = Math.max(game.prompts.length, game.choices?.length ?? 0);

  useEffect(() => {
    if (game.mode !== 'timer' || !started) return;
    setTimer(5);
    const tick = setInterval(() => setTimer((value) => value <= 1 ? 0 : value - 1), 1000);
    return () => clearInterval(tick);
  }, [game.mode, started, promptIndex]);

  const next = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRevealed(false);
    setPromptIndex(getPromptIndex(game.id, poolSize));
  };

  const start = () => {
    resetSession(game.id);
    setStarted(true);
    setPromptIndex(getPromptIndex(game.id, poolSize));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const setName = (index: number, value: string) => {
    setNames((previous) => previous.map((name, item) => item === index ? value : name));
  };

  return (
    <LinearGradient colors={['#3611D2', '#140B4A']} style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 30 }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.icon}><Feather name="arrow-left" size={20} color={c.text} /></Pressable>
          <Text style={styles.logo}>PRES</Text>
          <Pressable onPress={() => Alert.alert('Exit game', 'Leave this round?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Exit', style: 'destructive', onPress: () => router.back() }])} style={styles.icon}><Feather name="x" size={20} color={c.text} /></Pressable>
        </View>
        <View style={[styles.hero, { borderColor: game.color }]}>
          <Text style={[styles.tag, { color: game.color }]}>{game.tag}</Text>
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.desc}>{game.short}</Text>
        </View>
        {!started ? <StartState game={game} onStart={start} /> : (
          <View style={styles.playArea}>
            {game.mode === 'private' && !revealed ? (
              <View style={styles.privateNotice}>
                <Feather name="eye-off" size={25} color={c.accent} />
                <Text style={styles.noticeTitle}>ONLY YOU SHOULD LOOK</Text>
                <Text style={styles.noticeSub}>Pass the phone to one player.</Text>
                <Pressable onPress={() => setRevealed(true)} style={styles.outline}><Text style={styles.outlineText}>Reveal question</Text></Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.promptLabel}>{game.mode === 'timer' ? (timer ? 'TIME TO ANSWER' : 'TIME UP') : 'THE GROUP DECIDES'}</Text>
                {game.mode === 'choice' && choice ? (
                  <View style={styles.choices}>
                    <Choice label="A" text={choice[0]} color={game.color} />
                    <Text style={styles.or}>OR</Text>
                    <Choice label="B" text={choice[1]} color="#FF4B89" />
                  </View>
                ) : <View style={styles.promptCard}><Text style={styles.prompt}>{prompt}</Text></View>}
                {game.mode === 'timer' && <View style={styles.timer}><Text style={styles.timerText}>{timer}</Text><Text style={styles.timerCaption}>SECONDS</Text></View>}
                {game.mode === 'players' && <View style={styles.names}>{names.map((name, index) => <TextInput key={index} value={name} onChangeText={(value) => setName(index, value)} placeholder={index === 0 ? 'Player one' : 'Player two'} placeholderTextColor="rgba(255,255,255,0.38)" style={styles.input} />)}</View>}
                <View style={styles.controls}><Pressable onPress={next} style={styles.primary}><Feather name="shuffle" size={18} color={c.text} /><Text style={styles.primaryText}>NEXT</Text></Pressable><Pressable onPress={next} style={styles.skip}><Text style={styles.skipText}>SKIP</Text></Pressable></View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function Choice({ label, text, color }: { label: string; text: string; color: string }) {
  return <View style={[styles.choice, { borderColor: color }]}><Text style={[styles.choiceLabel, { color }]}>{label}</Text><Text style={styles.choiceText}>{text}</Text></View>;
}

function StartState({ game, onStart }: { game: ReturnType<typeof gameById>; onStart: () => void }) {
  return <View style={styles.start}><View style={styles.startIcon}><Feather name="play" size={28} color={c.text} /></View>{game.id === 'id-game' && <Text style={styles.startHint}>Everyone get your IDs ready</Text>}<Text style={styles.startTitle}>Ready to play?</Text><Text style={styles.startSub}>Questions stay on this phone. Play physically with your group.</Text><Pressable onPress={onStart} style={styles.primary}><Text style={styles.primaryText}>START GAME</Text><Feather name="arrow-right" size={18} color={c.text} /></Pressable></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, content: { paddingHorizontal: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, icon: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }, logo: { color: c.text, fontWeight: '800', fontSize: 24, letterSpacing: 3 }, hero: { marginTop: 30, padding: 20, borderRadius: 24, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.1)' }, tag: { fontSize: 11, fontWeight: '800', letterSpacing: 1 }, title: { color: c.text, fontSize: 34, fontWeight: '800', marginTop: 8 }, desc: { color: 'rgba(255,255,255,0.63)', fontSize: 14, lineHeight: 20, marginTop: 7 }, start: { alignItems: 'center', paddingVertical: 70 }, startIcon: { width: 72, height: 72, borderRadius: 24, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 22 }, startHint: { color: c.accent, fontWeight: '800', fontSize: 15, marginBottom: 20 }, startTitle: { color: c.text, fontSize: 25, fontWeight: '800' }, startSub: { color: 'rgba(255,255,255,0.62)', textAlign: 'center', fontSize: 14, lineHeight: 21, marginTop: 9, marginBottom: 24, maxWidth: 280 }, playArea: { paddingTop: 28 }, promptLabel: { color: 'rgba(255,255,255,0.62)', fontSize: 12, fontWeight: '800', letterSpacing: 1.4, marginBottom: 12 }, promptCard: { minHeight: 190, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', padding: 24 }, prompt: { color: c.text, fontSize: 25, lineHeight: 34, textAlign: 'center', fontWeight: '700' }, choices: { gap: 12 }, choice: { minHeight: 120, borderRadius: 22, borderWidth: 2, backgroundColor: 'rgba(255,255,255,0.1)', padding: 18, justifyContent: 'center' }, choiceLabel: { fontWeight: '800', fontSize: 12, letterSpacing: 1 }, choiceText: { color: c.text, fontWeight: '800', fontSize: 19, lineHeight: 26, marginTop: 5 }, or: { color: 'rgba(255,255,255,0.55)', fontWeight: '800', fontSize: 12, textAlign: 'center' }, timer: { alignItems: 'center', paddingVertical: 20 }, timerText: { color: c.accent, fontSize: 58, fontWeight: '800' }, timerCaption: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, controls: { flexDirection: 'row', gap: 10, marginTop: 24 }, primary: { flex: 1, backgroundColor: c.accent, borderRadius: 16, paddingHorizontal: 22, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }, primaryText: { color: c.text, fontSize: 14, fontWeight: '800', letterSpacing: 1 }, skip: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', borderRadius: 16, paddingHorizontal: 22, paddingVertical: 16, justifyContent: 'center' }, skipText: { color: c.text, fontWeight: '800', fontSize: 14 }, privateNotice: { alignItems: 'center', paddingVertical: 64 }, noticeTitle: { color: c.text, fontWeight: '800', fontSize: 18, letterSpacing: 1, marginTop: 18 }, noticeSub: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 7, marginBottom: 22 }, outline: { borderWidth: 1, borderColor: c.text, borderRadius: 99, paddingHorizontal: 18, paddingVertical: 12 }, outlineText: { color: c.text, fontWeight: '800', fontSize: 12 }, names: { gap: 10, marginTop: 18 }, input: { height: 50, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 15, color: c.text, backgroundColor: 'rgba(255,255,255,0.08)' } });