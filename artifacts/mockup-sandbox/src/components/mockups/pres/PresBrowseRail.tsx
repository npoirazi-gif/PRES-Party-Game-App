import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Flame,
  Heart,
  Menu,
  Play,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

type Game = {
  id: string;
  title: string;
  description: string;
  label: string;
  players: string;
  heat: string;
  color: string;
  pattern: string;
  mark: string;
  time: string;
  featured?: boolean;
};

const browseGames: Game[] = [
  {
    id: "most-likely",
    title: "Most Likely To",
    description: "Point fingers and settle debates on who is the absolute worst.",
    label: "VOTING",
    players: "4+ players",
    heat: "Spicy",
    color: "#B7F700",
    pattern: "checker",
    mark: "01",
    time: "10 min",
    featured: true,
  },
  {
    id: "never-have",
    title: "Never Have I Ever",
    description: "Expose your friends' deepest secrets before the pub.",
    label: "ICEBREAKER",
    players: "3+ players",
    heat: "Mild",
    color: "#FFB1C3",
    pattern: "rings",
    mark: "02",
    time: "15 min",
  },
  {
    id: "rather",
    title: "Would You Rather",
    description: "Terrible choices for terrible people. Pick your poison.",
    label: "DILEMMA",
    players: "2+ players",
    heat: "Medium",
    color: "#B8C3FF",
    pattern: "bars",
    mark: "03",
    time: "12 min",
  },
  {
    id: "red-flags",
    title: "Red Flags",
    description: "Green lights, bad decisions, and a room full of judges.",
    label: "JUDGEMENT",
    players: "3+ players",
    heat: "Spicy",
    color: "#FF6B4A",
    pattern: "dots",
    mark: "04",
    time: "18 min",
  },
  {
    id: "hot-takes",
    title: "Hot Takes",
    description: "Say the thing everyone is thinking. Then defend it.",
    label: "OPINIONS",
    players: "4+ players",
    heat: "Wild",
    color: "#FFC857",
    pattern: "slash",
    mark: "05",
    time: "20 min",
  },
  {
    id: "point-blame",
    title: "Point the Blame",
    description: "A very scientific way to find out who caused the chaos.",
    label: "GROUP VOTE",
    players: "5+ players",
    heat: "Medium",
    color: "#8DE0D2",
    pattern: "grid",
    mark: "06",
    time: "14 min",
  },
];

const vibeFilters = ["Everything", "Pub Pres", "House Pres", "Club Pres", "Unhinged Pres"];
const heatFilters = ["Any heat", "Mild", "Medium", "Spicy", "Wild"];
const playerFilters = ["Any group", "2+ players", "3+ players", "4+ players", "5+ players"];

const iconButtonStyle: CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(255,255,255,.075)",
  color: "#fffaf3",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

export function PresBrowseRail() {
  const [activeNav, setActiveNav] = useState<"browse" | "saved" | "vibes">("browse");
  const [activeVibe, setActiveVibe] = useState("Everything");
  const [activeHeat, setActiveHeat] = useState("Any heat");
  const [activePlayers, setActivePlayers] = useState("Any group");
  const [selectedId, setSelectedId] = useState("most-likely");
  const [saved, setSaved] = useState<string[]>(["never-have"]);
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Recommended");
  const [started, setStarted] = useState(false);
  const [railOpen, setRailOpen] = useState(false);

  const selected = browseGames.find((game) => game.id === selectedId) ?? browseGames[0];
  const filteredGames = useMemo(() => {
    let result = browseGames.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase());
      const matchesHeat = activeHeat === "Any heat" || game.heat === activeHeat;
      const playerCount = Number(game.players.charAt(0));
      const matchesPlayers =
        activePlayers === "Any group" || playerCount >= Number(activePlayers.charAt(0));
      const matchesSaved = activeNav !== "saved" || saved.includes(game.id);
      return matchesSearch && matchesHeat && matchesPlayers && matchesSaved;
    });

    if (sort === "Shortest") result = [...result].sort((a, b) => a.time.localeCompare(b.time, undefined, { numeric: true }));
    if (sort === "Most chaos") result = [...result].sort((a, b) => (b.heat === "Wild" ? 4 : b.heat === "Spicy" ? 3 : b.heat === "Medium" ? 2 : 1) - (a.heat === "Wild" ? 4 : a.heat === "Spicy" ? 3 : a.heat === "Medium" ? 2 : 1));
    return result;
  }, [activeHeat, activeNav, activePlayers, saved, search, sort]);

  const clearFilters = () => {
    setActiveVibe("Everything");
    setActiveHeat("Any heat");
    setActivePlayers("Any group");
    setSearch("");
  };

  const toggleSaved = (id: string) => {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <main className="browse-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        .browse-shell {
          --ink: #fffaf3;
          --muted: #aaa5d1;
          --dim: #7771a7;
          --violet: #140b4a;
          --violet-2: #21106b;
          --violet-3: #2d178b;
          --lime: #b7f700;
          --coral: #ff6b4a;
          min-height: 100dvh;
          color: var(--ink);
          background:
            radial-gradient(circle at 77% 6%, rgba(255,107,74,.18), transparent 22rem),
            radial-gradient(circle at 23% 87%, rgba(71,48,218,.22), transparent 26rem),
            var(--violet);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .browse-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .1;
          mix-blend-mode: screen;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.33'/%3E%3C/svg%3E");
        }
        .browse-layout { display: grid; grid-template-columns: 248px minmax(0, 1fr) 285px; gap: 24px; max-width: 1520px; min-height: 100dvh; margin: 0 auto; padding: 28px 30px 30px; position: relative; z-index: 1; }
        .browse-rail { padding: 4px 4px 0; }
        .browse-brand { color: #fff; letter-spacing: -.09em; font: 800 32px/1 "Syne", sans-serif; }
        .browse-brand i { color: var(--lime); font-style: normal; }
        .brand-note { margin: 9px 0 40px; color: var(--dim); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
        .rail-heading { display: flex; align-items: center; justify-content: space-between; margin: 0 0 15px; color: var(--muted); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
        .rail-close { display: none; color: var(--muted); border: 0; background: none; cursor: pointer; }
        .rail-section { margin-bottom: 28px; }
        .filter-stack { display: grid; gap: 5px; }
        .filter-button { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 11px 12px; border: 1px solid transparent; border-radius: 10px; color: var(--muted); background: transparent; cursor: pointer; text-align: left; font: 600 12px "DM Sans", sans-serif; transition: background .2s ease, color .2s ease, transform .2s ease; }
        .filter-button:hover { transform: translateX(3px); color: var(--ink); background: rgba(255,255,255,.06); }
        .filter-button.active { color: var(--violet); background: var(--lime); }
        .filter-count { color: inherit; opacity: .58; font-size: 10px; }
        .rail-rule { height: 1px; margin: 0 0 25px; background: rgba(255,255,255,.1); }
        .clear-button { display: inline-flex; align-items: center; gap: 7px; padding: 0; border: 0; color: var(--coral); background: none; cursor: pointer; font: 700 11px "DM Sans", sans-serif; }
        .rail-tip { margin-top: 50px; padding: 15px; border: 1px solid rgba(183,247,0,.18); border-radius: 14px; background: rgba(183,247,0,.055); }
        .rail-tip strong { display: block; margin-bottom: 5px; color: var(--lime); font: 700 12px "Syne", sans-serif; }
        .rail-tip p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.45; }
        .browse-main { min-width: 0; padding-top: 2px; }
        .main-topbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 36px; }
        .mobile-menu { display: none; }
        .search-box { display: flex; align-items: center; gap: 10px; width: min(330px, 100%); padding: 11px 13px; border: 1px solid rgba(255,255,255,.14); border-radius: 11px; color: var(--muted); background: rgba(255,255,255,.065); }
        .search-box:focus-within { border-color: rgba(183,247,0,.6); background: rgba(255,255,255,.09); }
        .search-box input { width: 100%; border: 0; outline: 0; color: var(--ink); background: transparent; font: 500 12px "DM Sans", sans-serif; }
        .search-box input::placeholder { color: var(--dim); }
        .top-actions { display: flex; align-items: center; gap: 10px; }
        .profile-chip { display: flex; align-items: center; gap: 9px; padding: 5px 9px 5px 5px; border: 1px solid rgba(255,255,255,.12); border-radius: 22px; color: var(--ink); background: rgba(255,255,255,.06); font-size: 11px; font-weight: 700; }
        .avatar { display: grid; width: 27px; height: 27px; place-items: center; border-radius: 50%; color: var(--violet); background: var(--coral); font: 800 10px "Syne", sans-serif; }
        .eyebrow { margin: 0 0 10px; color: var(--lime); font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .browse-title { max-width: 650px; margin: 0; color: var(--ink); font: 800 clamp(38px, 5vw, 68px)/.98 "Syne", sans-serif; letter-spacing: -.07em; }
        .browse-title span { color: var(--coral); }
        .browse-intro { max-width: 480px; margin: 17px 0 34px; color: var(--muted); font-size: 14px; line-height: 1.5; }
        .browse-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 17px; }
        .results-count { color: var(--muted); font-size: 12px; font-weight: 600; }
        .results-count b { color: var(--ink); }
        .sort-wrap { position: relative; }
        .sort-button { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; color: var(--muted); background: rgba(255,255,255,.055); cursor: pointer; font: 600 11px "DM Sans", sans-serif; }
        .sort-menu { position: absolute; top: calc(100% + 7px); right: 0; z-index: 3; min-width: 130px; padding: 5px; border: 1px solid rgba(255,255,255,.14); border-radius: 10px; background: #24116e; box-shadow: 0 15px 35px rgba(7,3,31,.38); }
        .sort-menu button { display: block; width: 100%; padding: 8px; border: 0; border-radius: 6px; color: var(--muted); background: transparent; cursor: pointer; text-align: left; font: 600 11px "DM Sans", sans-serif; }
        .sort-menu button:hover { color: var(--ink); background: rgba(255,255,255,.08); }
        .game-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .game-card { min-width: 0; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 17px; background: rgba(255,255,255,.067); transition: border-color .2s ease, transform .2s ease, background .2s ease; }
        .game-card:hover, .game-card.selected { border-color: rgba(183,247,0,.55); background: rgba(255,255,255,.105); transform: translateY(-3px); }
        .game-card.selected { box-shadow: inset 0 0 0 1px rgba(183,247,0,.11); }
        .game-card-main { display: block; width: 100%; padding: 17px 17px 15px; border: 0; color: var(--ink); background: transparent; cursor: pointer; text-align: left; }
        .card-art { height: 125px; margin-bottom: 16px; padding: 14px; position: relative; overflow: hidden; border-radius: 11px; color: var(--violet); background: var(--card-color); }
        .card-art::before, .card-art::after { content: ""; position: absolute; pointer-events: none; }
        .card-art.checker::before { inset: 0; opacity: .13; background: linear-gradient(45deg, var(--violet) 25%, transparent 25%, transparent 75%, var(--violet) 75%), linear-gradient(45deg, var(--violet) 25%, transparent 25%, transparent 75%, var(--violet) 75%); background-position: 0 0, 15px 15px; background-size: 30px 30px; }
        .card-art.rings::before { width: 155px; height: 155px; border: 20px solid rgba(255,255,255,.33); border-radius: 50%; right: -36px; top: -52px; }
        .card-art.rings::after { width: 90px; height: 90px; border: 13px solid rgba(20,11,74,.13); border-radius: 50%; right: 32px; bottom: -42px; }
        .card-art.bars::before { inset: -40px 45% -35px 43%; transform: rotate(32deg); background: rgba(20,11,74,.14); box-shadow: 40px 0 rgba(20,11,74,.14), -40px 0 rgba(255,255,255,.25); }
        .card-art.dots::before { inset: 0; background-image: radial-gradient(rgba(255,255,255,.4) 2px, transparent 2px); background-size: 14px 14px; }
        .card-art.slash::before { inset: -20px 42%; transform: rotate(27deg); background: rgba(20,11,74,.12); box-shadow: 26px 0 rgba(255,255,255,.26), 52px 0 rgba(20,11,74,.12); }
        .card-art.grid::before { inset: 0; opacity: .2; background: linear-gradient(rgba(20,11,74,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(20,11,74,.35) 1px, transparent 1px); background-size: 19px 19px; }
        .card-art-mark { position: absolute; right: 13px; bottom: 7px; color: rgba(20,11,74,.17); font: 800 57px/.8 "Syne", sans-serif; letter-spacing: -.1em; }
        .card-art-label { position: relative; z-index: 1; padding: 5px 7px; border-radius: 5px; color: var(--card-color); background: var(--violet); font: 800 9px "DM Sans", sans-serif; letter-spacing: .12em; }
        .card-heading { display: flex; align-items: start; justify-content: space-between; gap: 8px; }
        .card-heading h3 { max-width: 190px; margin: 0; font: 700 19px/1.04 "Syne", sans-serif; letter-spacing: -.045em; }
        .card-arrow { color: var(--dim); }
        .card-description { min-height: 36px; margin: 9px 0 15px; color: var(--muted); font-size: 11px; line-height: 1.42; }
        .card-meta { display: flex; align-items: center; gap: 6px; color: var(--dim); font-size: 10px; font-weight: 700; }
        .card-meta .meta-dot { width: 3px; height: 3px; margin: 0 2px; border-radius: 50%; background: var(--dim); }
        .card-meta .heat { color: var(--card-color); }
        .card-save { display: grid; width: 32px; height: 32px; position: absolute; right: 15px; top: 137px; place-items: center; border: 1px solid rgba(20,11,74,.18); border-radius: 9px; color: var(--violet); background: rgba(255,255,255,.45); cursor: pointer; }
        .card-save.saved { color: #e94070; background: rgba(255,255,255,.84); }
        .empty-state { grid-column: 1 / -1; padding: 50px 20px; border: 1px dashed rgba(255,255,255,.2); border-radius: 17px; color: var(--muted); text-align: center; }
        .empty-state strong { display: block; margin-bottom: 7px; color: var(--ink); font: 700 18px "Syne", sans-serif; }
        .reset-inline { margin-top: 15px; padding: 9px 12px; border: 1px solid rgba(183,247,0,.4); border-radius: 8px; color: var(--lime); background: transparent; cursor: pointer; font: 700 11px "DM Sans", sans-serif; }
        .play-dock { align-self: start; position: sticky; top: 25px; padding: 16px; border: 1px solid rgba(255,255,255,.13); border-radius: 18px; background: rgba(33,16,107,.82); box-shadow: 0 20px 45px rgba(7,3,31,.2); backdrop-filter: blur(15px); }
        .dock-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; color: var(--muted); font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
        .dock-label span { display: inline-flex; align-items: center; gap: 5px; color: var(--lime); letter-spacing: 0; text-transform: none; }
        .dock-art { height: 130px; margin-bottom: 15px; padding: 15px; position: relative; overflow: hidden; border-radius: 12px; color: var(--violet); background: var(--dock-color); }
        .dock-art::before { content: ""; position: absolute; width: 150px; height: 150px; right: -36px; top: -44px; border: 20px solid rgba(20,11,74,.14); border-radius: 50%; box-shadow: -45px 70px 0 -10px rgba(255,255,255,.24); }
        .dock-art b { position: absolute; right: 13px; bottom: 10px; color: rgba(20,11,74,.2); font: 800 55px/.8 "Syne", sans-serif; letter-spacing: -.1em; }
        .dock-art span { position: relative; z-index: 1; padding: 5px 7px; border-radius: 5px; background: var(--violet); color: var(--dock-color); font: 800 9px "DM Sans", sans-serif; letter-spacing: .1em; }
        .dock-title { margin: 0; font: 700 24px/1 "Syne", sans-serif; letter-spacing: -.05em; }
        .dock-copy { margin: 8px 0 16px; color: var(--muted); font-size: 11px; line-height: 1.45; }
        .dock-details { display: flex; gap: 8px; margin-bottom: 16px; }
        .dock-detail { display: flex; align-items: center; gap: 5px; padding: 7px 8px; border-radius: 7px; color: var(--muted); background: rgba(255,255,255,.08); font-size: 10px; font-weight: 700; }
        .dock-play { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; border: 0; border-radius: 10px; color: var(--violet); background: var(--lime); cursor: pointer; font: 800 12px "DM Sans", sans-serif; transition: transform .2s ease, background .2s ease; }
        .dock-play:hover { transform: translateY(-2px); background: #c8ff3d; }
        .dock-secondary { display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 10px; padding: 3px; border: 0; color: var(--muted); background: transparent; cursor: pointer; font: 600 10px "DM Sans", sans-serif; }
        .dock-secondary svg { margin-right: 5px; color: var(--coral); }
        .dock-queue { margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,.11); }
        .dock-queue-head { display: flex; justify-content: space-between; margin-bottom: 11px; color: var(--muted); font-size: 10px; font-weight: 700; }
        .queue-row { display: flex; align-items: center; gap: 9px; padding: 8px 0; color: var(--muted); font-size: 11px; }
        .queue-number { display: grid; width: 22px; height: 22px; place-items: center; border-radius: 6px; color: var(--violet); background: var(--queue-color); font: 800 9px "Syne", sans-serif; }
        .queue-row b { color: var(--ink); font-weight: 600; }
        .started-banner { position: fixed; left: 50%; bottom: 22px; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 20px; width: min(420px, calc(100% - 32px)); padding: 13px 15px; border: 1px solid rgba(183,247,0,.4); border-radius: 12px; color: var(--ink); background: #2d178b; box-shadow: 0 15px 40px rgba(0,0,0,.35); transform: translateX(-50%); animation: browseLift .25s ease both; font-size: 11px; font-weight: 700; }
        .started-banner button { border: 0; color: var(--lime); background: transparent; cursor: pointer; }
        @keyframes browseLift { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @media (max-width: 1080px) { .browse-layout { grid-template-columns: 210px minmax(0, 1fr) 260px; gap: 17px; padding-left: 22px; padding-right: 22px; } .card-description { min-height: 52px; } }
        @media (max-width: 820px) { .browse-layout { grid-template-columns: 190px minmax(0, 1fr); } .play-dock { grid-column: 1 / -1; grid-row: 2; position: static; display: grid; grid-template-columns: 130px 1fr; gap: 0 16px; } .dock-label, .dock-title, .dock-copy, .dock-details, .dock-play, .dock-secondary { grid-column: 2; } .dock-label { margin-top: 2px; } .dock-art { grid-row: 1 / span 5; height: 170px; margin: 0; } .dock-queue { display: none; } }
        @media (max-width: 700px) { .browse-shell { overflow: visible; } .browse-layout { display: block; padding: 19px 17px 28px; } .browse-rail { display: none; position: fixed; inset: 0 auto 0 0; z-index: 10; width: min(290px, 87vw); padding: 23px 22px; background: #21106b; box-shadow: 20px 0 50px rgba(7,3,31,.32); overflow-y: auto; } .browse-rail.open { display: block; } .rail-close { display: block; } .brand-note { margin-bottom: 32px; } .rail-tip { margin-top: 28px; } .main-topbar { margin-bottom: 32px; } .mobile-menu { display: grid; } .search-box { width: auto; flex: 1; } .profile-chip { display: none; } .browse-title { font-size: 45px; } .browse-intro { margin-bottom: 27px; } .game-grid { grid-template-columns: 1fr; } .card-art { height: 110px; } .card-save { top: 122px; } .game-card-main { padding-bottom: 14px; } .play-dock { display: block; margin-top: 18px; } .dock-art { height: 105px; margin-bottom: 14px; } .dock-queue { display: block; } }
      `}</style>

      <div className="browse-layout">
        <aside className={`browse-rail ${railOpen ? "open" : ""}`} aria-label="Browse filters">
          <div className="rail-heading">
            <span>Explore</span>
            <button className="rail-close" type="button" aria-label="Close filters" onClick={() => setRailOpen(false)}><X size={17} /></button>
          </div>
          <div className="browse-brand">pres<i>.</i></div>
          <p className="brand-note">Party games for people<br />with questionable friends.</p>

          <div className="rail-section">
            <div className="rail-heading"><span>Browse by vibe</span><Compass size={14} /></div>
            <div className="filter-stack">
              {vibeFilters.map((vibe, index) => (
                <button key={vibe} type="button" className={`filter-button ${activeVibe === vibe ? "active" : ""}`} onClick={() => { setActiveVibe(vibe); setActiveNav("browse"); }}>
                  <span>{vibe}</span><span className="filter-count">{index === 0 ? "18" : `${index * 3 + 2}`}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rail-rule" />
          <div className="rail-section">
            <div className="rail-heading"><span>Group size</span><Users size={14} /></div>
            <div className="filter-stack">
              {playerFilters.map((players) => (
                <button key={players} type="button" className={`filter-button ${activePlayers === players ? "active" : ""}`} onClick={() => setActivePlayers(players)}>
                  <span>{players}</span>{activePlayers === players && <Check size={13} />}
                </button>
              ))}
            </div>
          </div>

          <div className="rail-rule" />
          <div className="rail-section">
            <div className="rail-heading"><span>Heat check</span><Flame size={14} /></div>
            <div className="filter-stack">
              {heatFilters.map((heat) => (
                <button key={heat} type="button" className={`filter-button ${activeHeat === heat ? "active" : ""}`} onClick={() => setActiveHeat(heat)}>
                  <span>{heat}</span>{heat !== "Any heat" && <span className="filter-count">{heat === "Wild" ? "4" : heat === "Spicy" ? "7" : heat === "Medium" ? "5" : "2"}</span>}
                </button>
              ))}
            </div>
          </div>
          <button className="clear-button" type="button" onClick={clearFilters}><X size={13} /> Clear all filters</button>
          <div className="rail-tip"><strong>Not sure where to start?</strong><p>Try Pub Pres for low-stakes chaos and questionable revelations.</p></div>
        </aside>

        <section className="browse-main">
          <header className="main-topbar">
            <button className="mobile-menu" type="button" aria-label="Open filters" style={iconButtonStyle} onClick={() => setRailOpen(true)}><Menu size={17} /></button>
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the chaos..." aria-label="Search games" />
              {search && <button type="button" aria-label="Clear search" onClick={() => setSearch("")} style={{ border: 0, color: "var(--muted)", background: "transparent", cursor: "pointer", display: "grid" }}><X size={14} /></button>}
            </label>
            <div className="top-actions">
              <button type="button" aria-label="Saved games" style={iconButtonStyle} onClick={() => setActiveNav(activeNav === "saved" ? "browse" : "saved")}><Bookmark size={17} fill={activeNav === "saved" ? "currentColor" : "none"} /></button>
              <div className="profile-chip"><span className="avatar">AP</span><span>Alex&apos;s room</span><ChevronDown size={13} /></div>
            </div>
          </header>

          <p className="eyebrow">The Pres library / {activeVibe}</p>
          <h1 className="browse-title">Find your next<br /><span>bad idea.</span></h1>
          <p className="browse-intro">Browse the full collection, tune the mood, and get straight to the good bit. No accounts. No awkward rules briefing.</p>

          <div className="browse-toolbar">
            <div className="results-count"><b>{filteredGames.length}</b> games worth risking the group chat</div>
            <div className="sort-wrap">
              <button type="button" className="sort-button" onClick={() => setSortOpen(!sortOpen)}>Sort: {sort}<ChevronDown size={13} /></button>
              {sortOpen && <div className="sort-menu">{["Recommended", "Shortest", "Most chaos"].map((option) => <button type="button" key={option} onClick={() => { setSort(option); setSortOpen(false); }}>{option}</button>)}</div>}
            </div>
          </div>

          <div className="game-grid" aria-label="Game library">
            {filteredGames.length === 0 ? (
              <div className="empty-state"><strong>No games in this particular flavour of chaos.</strong><span>Try loosening one of the filters.</span><br /><button className="reset-inline" type="button" onClick={clearFilters}>Reset filters</button></div>
            ) : filteredGames.map((game) => (
              <article className={`game-card ${selectedId === game.id ? "selected" : ""}`} key={game.id} style={{ "--card-color": game.color } as CSSProperties}>
                <button type="button" className="game-card-main" onClick={() => { setSelectedId(game.id); setStarted(false); }}>
                  <div className={`card-art ${game.pattern}`}><span className="card-art-label">{game.label}</span><span className="card-art-mark">{game.mark}</span></div>
                  <div className="card-heading"><h3>{game.title}</h3><ChevronRight className="card-arrow" size={17} /></div>
                  <p className="card-description">{game.description}</p>
                  <div className="card-meta"><Users size={13} /> {game.players}<span className="meta-dot" /><Flame size={13} /> <span className="heat">{game.heat}</span><span style={{ marginLeft: "auto" }}>{game.time}</span></div>
                </button>
                <button type="button" className={`card-save ${saved.includes(game.id) ? "saved" : ""}`} aria-label={saved.includes(game.id) ? `Remove ${game.title} from saved` : `Save ${game.title}`} onClick={() => toggleSaved(game.id)}><Heart size={15} fill={saved.includes(game.id) ? "currentColor" : "none"} /></button>
              </article>
            ))}
          </div>
        </section>

        <aside className="play-dock" aria-label="Selected game">
          <div className="dock-label"><span>Ready to play</span><span><Sparkles size={12} /> live pick</span></div>
          <div className="dock-art" style={{ "--dock-color": selected.color } as CSSProperties}><span>{selected.label}</span><b>{selected.mark}</b></div>
          <h2 className="dock-title">{selected.title}</h2>
          <p className="dock-copy">{selected.description}</p>
          <div className="dock-details"><span className="dock-detail"><Users size={13} /> {selected.players}</span><span className="dock-detail"><Flame size={13} /> {selected.heat}</span></div>
          <button type="button" className="dock-play" onClick={() => setStarted(true)}><Play size={14} fill="currentColor" /> Start this one</button>
          <button type="button" className="dock-secondary" onClick={() => toggleSaved(selected.id)}><Heart size={13} fill={saved.includes(selected.id) ? "currentColor" : "none"} /> {saved.includes(selected.id) ? "Saved to your room" : "Save for later"}</button>
          <div className="dock-queue">
            <div className="dock-queue-head"><span>Up next</span><span>{Math.max(0, filteredGames.length - 1)} in browse</span></div>
            {browseGames.filter((game) => game.id !== selected.id).slice(0, 3).map((game) => (
              <button type="button" className="queue-row" key={game.id} onClick={() => setSelectedId(game.id)} style={{ width: "100%", border: 0, background: "transparent", cursor: "pointer", textAlign: "left" }}>
                <span className="queue-number" style={{ "--queue-color": game.color } as CSSProperties}>{game.mark}</span><b>{game.title}</b><ChevronRight size={13} style={{ marginLeft: "auto", color: "var(--dim)" }} />
              </button>
            ))}
          </div>
        </aside>
      </div>
      {started && <div className="started-banner" role="status"><span>{selected.title} is ready. Pass the phone to the first victim.</span><button type="button" aria-label="Dismiss" onClick={() => setStarted(false)}><X size={16} /></button></div>}
    </main>
  );
}

export default PresBrowseRail;