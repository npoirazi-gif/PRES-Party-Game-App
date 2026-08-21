import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { dsColor } from '@/constants/ds';
import { gameById } from '@/data/games';
import { usePres } from '@/context/PresContext';

// Art-directed gradient stops — intentionally not part of the token set
const GRAD_TOP = '#3611D2';
const GRAD_BOT = '#140B4A';

const c = dsColor;

// Round length → total seconds for the session countdown
const ROUND_SECONDS: Record<string, number> = {
  short: 120,
  medium: 240,
  long: 420,
};

// ─── Card animation hook ──────────────────────────────────────────────────────
function useCardAnimation() {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const animateOut = useCallback(
    () =>
      new Promise<void>((resolve) => {
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -60,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start(() => resolve());
      }),
    [translateX, opacity],
  );

  const resetIn = useCallback(() => {
    translateX.setValue(60);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX, opacity]);

  return { translateX, opacity, animateOut, resetIn };
}

// ─── Countdown ring ───────────────────────────────────────────────────────────
function CountdownBar({
  remaining,
  total,
  color,
}: {
  remaining: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? remaining / total : 0;
  const barWidth = useRef(new Animated.Value(1)).current;
  const prevPct = useRef(pct);

  useEffect(() => {
    if (pct !== prevPct.current) {
      Animated.timing(barWidth, {
        toValue: pct,
        duration: 980,
        useNativeDriver: false,
      }).start();
      prevPct.current = pct;
    }
  }, [pct, barWidth]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const label =
    remaining >= 60
      ? `${mins}:${String(secs).padStart(2, '0')}`
      : `${remaining}s`;

  return (
    <View style={cd.wrap}>
      <View style={cd.track}>
        <Animated.View
          style={[
            cd.fill,
            {
              backgroundColor: remaining <= 30 ? '#FF4B4B' : color,
              width: barWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <Text style={[cd.label, remaining <= 30 && { color: '#FF4B4B' }]}>
        {label}
      </Text>
    </View>
  );
}

const cd = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  track: {
    flex: 1,
    height: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 99 },
  label: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '800',
    minWidth: 36,
    textAlign: 'right',
  },
});

// ─── End of round screen ──────────────────────────────────────────────────────
function EndScreen({
  reason,
  questionsAnswered,
  totalQuestions,
  game,
  onPlayAgain,
  onExit,
}: {
  reason: 'timer' | 'questions';
  questionsAnswered: number;
  totalQuestions: number;
  game: ReturnType<typeof gameById>;
  onPlayAgain: () => void;
  onExit: () => void;
}) {
  return (
    <View style={es.wrap}>
      <View style={[es.badge, { borderColor: game.color }]}>
        <Feather
          name={reason === 'timer' ? 'clock' : 'check-circle'}
          size={30}
          color={game.color}
        />
      </View>
      <Text style={es.heading}>
        {reason === 'timer' ? "TIME'S UP!" : 'ROUND COMPLETE'}
      </Text>
      <Text style={es.sub}>
        {questionsAnswered} question{questionsAnswered !== 1 ? 's' : ''} played
      </Text>

      <View style={es.statRow}>
        <View style={es.stat}>
          <Text style={[es.statValue, { color: game.color }]}>
            {questionsAnswered}
          </Text>
          <Text style={es.statLabel}>PLAYED</Text>
        </View>
        <View style={[es.statDivider]} />
        <View style={es.stat}>
          <Text style={[es.statValue, { color: game.color }]}>
            {totalQuestions}
          </Text>
          <Text style={es.statLabel}>TOTAL</Text>
        </View>
      </View>

      <Pressable onPress={onPlayAgain} style={[es.btn, { backgroundColor: game.color }]}>
        <Feather name="refresh-cw" size={18} color="#000" />
        <Text style={[es.btnText, { color: '#000' }]}>PLAY AGAIN</Text>
      </Pressable>
      <Pressable onPress={onExit} style={es.outlineBtn}>
        <Text style={es.outlineBtnText}>Exit game</Text>
      </Pressable>
    </View>
  );
}

const es = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 48 },
  badge: {
    width: 76,
    height: 76,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  heading: {
    color: c.foreground,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  sub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 28,
  },
  statRow: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 32,
    width: '100%',
    justifyContent: 'center',
  },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 36, fontWeight: '900' },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    marginBottom: 12,
  },
  btnText: { fontSize: 15, fontWeight: '900', letterSpacing: 1 },
  outlineBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    width: '100%',
    alignItems: 'center',
  },
  outlineBtnText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    fontSize: 14,
  },
});

// ─── Choice card ──────────────────────────────────────────────────────────────
function Choice({
  label,
  text,
  color,
}: {
  label: string;
  text: string;
  color: string;
}) {
  return (
    <View style={[styles.choice, { borderColor: color }]}>
      <Text style={[styles.choiceLabel, { color }]}>{label}</Text>
      <Text style={styles.choiceText}>{text}</Text>
    </View>
  );
}

// ─── Start screen ─────────────────────────────────────────────────────────────
function StartState({
  game,
  roundLength,
  onStart,
}: {
  game: ReturnType<typeof gameById>;
  roundLength: string;
  onStart: () => void;
}) {
  const totalSecs = ROUND_SECONDS[roundLength] ?? ROUND_SECONDS.medium;
  const mins = Math.floor(totalSecs / 60);
  const questionTotal = Math.max(game.prompts.length, game.choices?.length ?? 0);
  const label =
    roundLength === 'short' ? '🔥 Short' : roundLength === 'long' ? '🐢 Long' : '⏱ Medium';

  return (
    <View style={styles.start}>
      <View style={[styles.startIcon, { backgroundColor: game.color }]}>
        <Feather name="play" size={28} color="#000" />
      </View>
      {game.id === 'id-game' && (
        <Text style={[styles.startHint, { color: game.color }]}>
          Everyone get your IDs ready
        </Text>
      )}
      <Text style={styles.startTitle}>Ready to play?</Text>
      <Text style={styles.startSub}>
        Questions stay on this phone. Play physically with your group.
      </Text>

      <View style={styles.startMeta}>
        <View style={styles.metaPill}>
          <Feather name="clock" size={13} color="rgba(255,255,255,0.6)" />
          <Text style={styles.metaText}>
            {label} · {mins} min
          </Text>
        </View>
        <View style={styles.metaPill}>
          <Feather name="list" size={13} color="rgba(255,255,255,0.6)" />
          <Text style={styles.metaText}>{questionTotal} questions</Text>
        </View>
      </View>

      <Pressable
        onPress={onStart}
        style={[styles.primary, { backgroundColor: game.color }]}
      >
        <Text style={[styles.primaryText, { color: '#000' }]}>START GAME</Text>
        <Feather name="arrow-right" size={18} color="#000" />
      </Pressable>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function GameScreen() {
  const { id, roundLength: rawRoundLength } = useLocalSearchParams<{
    id: string;
    roundLength?: string;
  }>();
  const roundLength = rawRoundLength ?? 'medium';
  const game = gameById(id);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getPromptIndex, resetSession } = usePres();

  const totalRoundSecs = ROUND_SECONDS[roundLength] ?? ROUND_SECONDS.medium;

  const [started, setStarted] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [roundTimer, setRoundTimer] = useState(totalRoundSecs);
  const [perQTimer, setPerQTimer] = useState(5);
  const [names, setNames] = useState(['', '']);
  const [revealed, setRevealed] = useState(false);
  const [ended, setEnded] = useState<'timer' | 'questions' | null>(null);

  const { translateX, opacity, animateOut, resetIn } = useCardAnimation();

  const poolSize = Math.max(
    game.prompts.length,
    game.choices?.length ?? 0,
  );
  const prompt = game.prompts[promptIndex % game.prompts.length];
  const choice = game.choices?.[promptIndex % (game.choices?.length ?? 1)];

  // Round-level countdown (all modes)
  useEffect(() => {
    if (!started || ended) return;
    const tick = setInterval(() => {
      setRoundTimer((t) => {
        if (t <= 1) {
          clearInterval(tick);
          setEnded('timer');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [started, ended]);

  // Per-question timer for timer-mode games
  useEffect(() => {
    if (game.mode !== 'timer' || !started || ended) return;
    setPerQTimer(5);
    const tick = setInterval(
      () => setPerQTimer((v) => (v <= 1 ? 0 : v - 1)),
      1000,
    );
    return () => clearInterval(tick);
  }, [game.mode, started, promptIndex, ended]);

  const advance = useCallback(async () => {
    if (ended) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await animateOut();
    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    setRevealed(false);

    if (newCount >= poolSize) {
      setEnded('questions');
      return;
    }

    setPromptIndex(getPromptIndex(game.id, poolSize));
    resetIn();
  }, [
    ended,
    questionCount,
    game,
    poolSize,
    animateOut,
    resetIn,
    getPromptIndex,
  ]);

  const start = () => {
    resetSession(game.id);
    setStarted(true);
    setRoundTimer(totalRoundSecs);
    setQuestionCount(0);
    setEnded(null);
    setPromptIndex(getPromptIndex(game.id, poolSize));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetIn();
  };

  const playAgain = () => {
    resetSession(game.id);
    setStarted(false);
    setEnded(null);
    setRoundTimer(totalRoundSecs);
    setQuestionCount(0);
  };

  const exitGame = () => router.back();

  const confirmExit = () =>
    Alert.alert('Exit game', 'Leave this round?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', style: 'destructive', onPress: exitGame },
    ]);

  const setName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  return (
    <LinearGradient colors={[GRAD_TOP, GRAD_BOT]} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 30,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={confirmExit} style={styles.icon}>
            <Feather name="arrow-left" size={20} color={c.foreground} />
          </Pressable>
          <Text style={styles.logo}>PRES</Text>
          <Pressable onPress={confirmExit} style={styles.icon}>
            <Feather name="x" size={20} color={c.foreground} />
          </Pressable>
        </View>

        {/* Game branding */}
        <View style={[styles.hero, { borderColor: game.color }]}>
          <Text style={[styles.tag, { color: game.color }]}>{game.tag}</Text>
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.desc}>{game.short}</Text>
        </View>

        {/* Round countdown bar (visible once started, not on end screen) */}
        {started && !ended && (
          <CountdownBar
            remaining={roundTimer}
            total={totalRoundSecs}
            color={game.color}
          />
        )}

        {/* Content */}
        {!started ? (
          <StartState
            game={game}
            roundLength={roundLength}
            onStart={start}
          />
        ) : ended ? (
          <EndScreen
            reason={ended}
            questionsAnswered={questionCount}
            totalQuestions={poolSize}
            game={game}
            onPlayAgain={playAgain}
            onExit={exitGame}
          />
        ) : (
          <View style={styles.playArea}>
            {game.mode === 'private' && !revealed ? (
              <View style={styles.privateNotice}>
                <Feather name="eye-off" size={25} color={game.color} />
                <Text style={styles.noticeTitle}>ONLY YOU SHOULD LOOK</Text>
                <Text style={styles.noticeSub}>
                  Pass the phone to one player.
                </Text>
                <Pressable
                  onPress={() => setRevealed(true)}
                  style={[styles.outline, { borderColor: game.color }]}
                >
                  <Text style={[styles.outlineText, { color: game.color }]}>
                    Reveal question
                  </Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.promptLabel}>
                  {game.mode === 'timer'
                    ? perQTimer > 0
                      ? 'TIME TO ANSWER'
                      : 'TIME UP!'
                    : game.mode === 'private'
                      ? 'JUST FOR YOU'
                      : 'THE GROUP DECIDES'}
                </Text>

                {/* Animated card */}
                <Animated.View
                  style={{ transform: [{ translateX }], opacity }}
                >
                  {game.mode === 'choice' && choice ? (
                    <View style={styles.choices}>
                      <Choice label="A" text={choice[0]} color={game.color} />
                      <Text style={styles.or}>OR</Text>
                      <Choice label="B" text={choice[1]} color="#FF4B89" />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.promptCard,
                        { borderColor: `${game.color}44` },
                      ]}
                    >
                      <Text style={styles.prompt}>{prompt}</Text>
                    </View>
                  )}
                </Animated.View>

                {/* Per-question timer (timer mode) */}
                {game.mode === 'timer' && (
                  <View style={styles.timer}>
                    <Text
                      style={[
                        styles.timerText,
                        { color: perQTimer <= 2 ? '#FF4B4B' : game.color },
                      ]}
                    >
                      {perQTimer}
                    </Text>
                    <Text style={styles.timerCaption}>SECONDS</Text>
                  </View>
                )}

                {/* Player name inputs (players mode) */}
                {game.mode === 'players' && (
                  <View style={styles.names}>
                    {names.map((name, index) => (
                      <TextInput
                        key={index}
                        value={name}
                        onChangeText={(v) => setName(index, v)}
                        placeholder={
                          index === 0 ? 'Player one' : 'Player two'
                        }
                        placeholderTextColor="rgba(255,255,255,0.38)"
                        style={styles.input}
                      />
                    ))}
                  </View>
                )}

                {/* Controls */}
                <View style={styles.controls}>
                  <Pressable
                    onPress={advance}
                    style={[styles.primary, { backgroundColor: game.color }]}
                  >
                    <Feather name="shuffle" size={18} color="#000" />
                    <Text style={[styles.primaryText, { color: '#000' }]}>
                      NEXT
                    </Text>
                  </Pressable>
                  <Pressable onPress={advance} style={styles.skip}>
                    <Text style={styles.skipText}>PASS</Text>
                  </Pressable>
                </View>

                {/* Question counter */}
                <Text style={styles.counter}>
                  {questionCount + 1} / {poolSize}
                </Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: c.foreground,
    fontWeight: '800',
    fontSize: 24,
    letterSpacing: 3,
  },
  hero: {
    marginTop: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tag: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  title: { color: c.foreground, fontSize: 30, fontWeight: '800', marginTop: 6 },
  desc: {
    color: 'rgba(255,255,255,0.63)',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  // Start state
  start: { alignItems: 'center', paddingVertical: 48 },
  startIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  startHint: { fontWeight: '800', fontSize: 15, marginBottom: 14 },
  startTitle: { color: c.foreground, fontSize: 25, fontWeight: '800' },
  startSub: {
    color: 'rgba(255,255,255,0.62)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 20,
    maxWidth: 280,
  },
  startMeta: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  metaText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
  },

  // Play area
  playArea: { paddingTop: 22 },
  promptLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 12,
  },
  promptCard: {
    minHeight: 190,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  prompt: {
    color: c.foreground,
    fontSize: 25,
    lineHeight: 34,
    textAlign: 'center',
    fontWeight: '700',
  },
  choices: { gap: 12 },
  choice: {
    minHeight: 110,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.09)',
    padding: 18,
    justifyContent: 'center',
  },
  choiceLabel: { fontWeight: '800', fontSize: 12, letterSpacing: 1 },
  choiceText: {
    color: c.foreground,
    fontWeight: '800',
    fontSize: 19,
    lineHeight: 26,
    marginTop: 5,
  },
  or: {
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },

  // Timer
  timer: { alignItems: 'center', paddingVertical: 16 },
  timerText: { fontSize: 58, fontWeight: '800' },
  timerCaption: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // Players
  names: { gap: 10, marginTop: 18 },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    color: c.foreground,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  // Controls
  controls: { flexDirection: 'row', gap: 10, marginTop: 22 },
  primary: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryText: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  skip: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  skipText: { color: c.foreground, fontWeight: '800', fontSize: 14 },
  counter: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 14,
  },

  // Private notice
  privateNotice: { alignItems: 'center', paddingVertical: 56 },
  noticeTitle: {
    color: c.foreground,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 1,
    marginTop: 18,
  },
  noticeSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 22,
  },
  outline: {
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  outlineText: { fontWeight: '800', fontSize: 12 },
});
