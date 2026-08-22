import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PremiumAccessFeature } from '@/config/premium';

type State = {
  vibe: string;
  setVibe: (v: string) => void;
  recent: string[];
  addRecent: (id: string) => void;
  getPromptIndex: (id: string, total: number) => number;
  resetSession: (id: string) => void;
  isPremium: boolean;
  setPremiumForTesting: (value: boolean) => void;
  canAccessPremium: (feature: PremiumAccessFeature) => boolean;
};

const Ctx = createContext<State | null>(null);

const STORAGE_KEYS = ['pres-vibe', 'pres-recent', 'pres-used', 'pres-premium'] as const;

export function PresProvider({ children }: { children: React.ReactNode }) {
  const [vibe, setVibeState] = useState('Pub Pres');
  const [recent, setRecent] = useState<string[]>([]);
  const [used, setUsed] = useState<Record<string, number[]>>({});
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet([...STORAGE_KEYS]).then((rows) => {
      const map = Object.fromEntries(rows);
      if (map['pres-vibe']) setVibeState(map['pres-vibe']);
      if (map['pres-recent']) setRecent(JSON.parse(map['pres-recent']));
      if (map['pres-used']) setUsed(JSON.parse(map['pres-used']));
      if (__DEV__ && map['pres-premium']) setIsPremium(map['pres-premium'] === 'true');
    });
  }, []);

  const setVibe = (nextVibe: string) => {
    setVibeState(nextVibe);
    AsyncStorage.setItem('pres-vibe', nextVibe);
  };

  const addRecent = (id: string) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((item) => item !== id)].slice(0, 4);
      AsyncStorage.setItem('pres-recent', JSON.stringify(next));
      return next;
    });
  };

  const getPromptIndex = (id: string, total: number) => {
    const current = used[id] ?? [];
    const available = Array.from({ length: total }, (_, i) => i).filter((i) => !current.includes(i));
    const pool = available.length ? available : Array.from({ length: total }, (_, i) => i);
    const index = pool[Math.floor(Math.random() * pool.length)];
    const next = { ...used, [id]: available.length ? [...current, index] : [index] };
    setUsed(next);
    AsyncStorage.setItem('pres-used', JSON.stringify(next));
    return index;
  };

  const resetSession = (id: string) => {
    const next = { ...used, [id]: [] };
    setUsed(next);
    AsyncStorage.setItem('pres-used', JSON.stringify(next));
  };

  const setPremiumForTesting = (value: boolean) => {
    if (!__DEV__) return;
    setIsPremium(value);
    AsyncStorage.setItem('pres-premium', String(value));
  };

  const value = useMemo(
    () => ({
      vibe,
      setVibe,
      recent,
      addRecent,
      getPromptIndex,
      resetSession,
      isPremium,
      setPremiumForTesting,
      canAccessPremium: (_feature: PremiumAccessFeature) => __DEV__ && isPremium,
    }),
    [vibe, recent, used, isPremium],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePres() {
  const value = useContext(Ctx);
  if (!value) throw new Error('usePres must be used inside PresProvider');
  return value;
}
