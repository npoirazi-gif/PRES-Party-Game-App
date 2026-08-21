import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import { games, Game } from '@/data/games';
type State = { vibe: string; setVibe: (v:string)=>void; recent: string[]; addRecent: (id:string)=>void; getPromptIndex: (id:string, total:number)=>number; resetSession:(id:string)=>void };
const Ctx = createContext<State | null>(null);
export function PresProvider({children}:{children:React.ReactNode}) { const [vibe,setVibeState]=useState('Pub Pres'); const [recent,setRecent]=useState<string[]>([]); const [used,setUsed]=useState<Record<string,number[]>>({});
 useEffect(()=>{AsyncStorage.multiGet(['pres-vibe','pres-recent','pres-used']).then(rows=>{const map=Object.fromEntries(rows); if(map['pres-vibe']) setVibeState(map['pres-vibe']); if(map['pres-recent']) setRecent(JSON.parse(map['pres-recent'])); if(map['pres-used']) setUsed(JSON.parse(map['pres-used']));});},[]);
 const setVibe=(v:string)=>{setVibeState(v); AsyncStorage.setItem('pres-vibe',v);};
 const addRecent=(id:string)=>{setRecent(prev=>{const next=[id,...prev.filter(x=>x!==id)].slice(0,4); AsyncStorage.setItem('pres-recent',JSON.stringify(next)); return next;});};
 const getPromptIndex=(id:string,total:number)=>{const current=used[id] ?? []; const available=Array.from({length:total},(_,i)=>i).filter(i=>!current.includes(i)); const pool=available.length?available:Array.from({length:total},(_,i)=>i); const index=pool[Math.floor(Math.random()*pool.length)]; const next={...used,[id]:available.length?[...current,index]:[index]}; setUsed(next); AsyncStorage.setItem('pres-used',JSON.stringify(next)); return index;};
 const resetSession=(id:string)=>{const next={...used,[id]:[]};setUsed(next);AsyncStorage.setItem('pres-used',JSON.stringify(next));}; return <Ctx.Provider value={{vibe,setVibe,recent,addRecent,getPromptIndex,resetSession}}>{children}</Ctx.Provider> }
export function usePres(){const value=useContext(Ctx); if(!value) throw new Error('usePres must be used inside PresProvider'); return value;}
