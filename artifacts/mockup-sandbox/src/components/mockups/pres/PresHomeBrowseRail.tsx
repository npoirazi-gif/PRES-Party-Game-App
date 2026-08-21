import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Flame,
  Gamepad2,
  Heart,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";

type Game = {
  id: string;
  title: string;
  description: string;
  category: string;
  players: string;
  heat: "Mild" | "Medium" | "Spicy";
  color: string;
  mark: string;
};

const games: Game[] = [
  {
    id: "most-likely",
    title: "Most Likely To",
    description: "Point fingers and settle debates on who is the absolute worst.",
    category: "Voting",
    players: "4+ players",
    heat: "Spicy",
    color: "#B7F700",
    mark: "01",
  },
  {
    id: "never-have",
    title: "Never Have I Ever",
    description: "Expose your friends' deepest secrets before the pub.",
    category: "Icebreaker",
    players: "3+ players",
    heat: "Mild",
    color: "#FFB1C3",
    mark: "02",
  },
  {
    id: "rather",
    title: "Would You Rather",
    description: "Terrible choices for terrible people. Pick your poison.",
    category: "Dilemma",
    players: "2+ players",
    heat: "Medium",
    color: "#B8C3FF",
    mark: "03",
  },
  {
    id: "hot-seat",
    title: "Hot Seat",
    description: "One friend. Five questions. Absolutely no time to prepare.",
    category: "Questions",
    players: "3+ players",
    heat: "Spicy",
    color: "#FF815E",
    mark: "04",
  },
  {
    id: "rapid-fire",
    title: "Rapid Fire",
    description: "Say the first thing that comes to mind. Regret it later.",
    category: "Fast",
    players: "2+ players",
    heat: "Medium",
    color: "#F6D56D",
    mark: "05",
  },
];

const categories = ["All games", "Icebreaker", "Voting", "Dilemma", "Questions", "Fast"];
const heatLevels = ["Any heat", "Mild", "Medium", "Spicy"];

export function PresHomeBrowseRail() {
  const [category, setCategory] = useState("All games");
  const [heat, setHeat] = useState("Any heat");
  const [players, setPlayers] = useState("Any group");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("most-likely");
  const [saved, setSaved] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredGames = useMemo(
    () =>
      games.filter((game) => {
        const matchesCategory = category === "All games" || game.category === category;
        const matchesHeat = heat === "Any heat" || game.heat === heat;
        const matchesPlayers =
          players === "Any group" ||
          (players === "2–3 players" && game.players.startsWith("2")) ||
          (players === "4+ players" && game.players.startsWith("4"));
        const haystack = `${game.title} ${game.description} ${game.category}`.toLowerCase();
        return matchesCategory && matchesHeat && matchesPlayers && haystack.includes(query.toLowerCase());
      }),
    [category, heat, players, query],
  );

  const selected = games.find((game) => game.id === selectedId) ?? games[0];
  const isSaved = saved.includes(selected.id);

  const chooseGame = (id: string) => {
    setSelectedId(id);
    setNotice("");
  };

  const toggleSaved = (id: string) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const startGame = () => {
    setNotice(`${selected.title} queued — pass the phone to the first victim.`);
  };

  return (
    <main className="browse-shell">
      <style>{`
        .browse-shell {
          --ink: #fffaf3;
          --muted: #aaa2d0;
          --purple: #140b4a;
          --purple-2: #21106b;
          --purple-3: #2c1496;
          --lime: #b7f700;
          --line: rgba(255,255,255,.13);
          min-height: 100dvh;
          color: var(--ink);
          background:
            radial-gradient(circle at 95% 0%, rgba(255,107,74,.22), transparent 26%),
            radial-gradient(circle at 0% 70%, rgba(65,42,190,.28), transparent 32%),
            var(--purple);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
          position: relative;
        }
        .browse-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.33'/%3E%3C/svg%3E");
          mix-blend-mode: screen;
        }
        .browse-layout { max-width: 860px; min-height: 100dvh; margin: 0 auto; padding: 22px 22px 128px; position: relative; z-index: 1; }
        .browse-header { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .browse-logo { color: #fff; letter-spacing: -.09em; font: 900 30px/1 "Arial Black", "DM Sans", sans-serif; }
        .browse-logo i { color: var(--lime); font-style: normal; }
        .eyebrow { color: var(--lime); font-size: 10px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
        .header-note { display: flex; align-items: center; gap: 7px; color: var(--muted); font-size: 11px; font-weight: 700; }
        .live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--lime); box-shadow: 0 0 0 4px rgba(183,247,0,.12); }
        .browse-intro { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin: 64px 0 42px; }
        .browse-title { max-width: 540px; margin: 8px 0 0; color: #fffaf3; font: 900 clamp(42px, 8vw, 75px)/.91 "Arial Black", "DM Sans", sans-serif; letter-spacing: -.075em; }
        .browse-title span { color: var(--lime); }
        .intro-copy { width: 190px; margin: 0 0 3px; color: var(--muted); font-size: 12px; line-height: 1.55; }
        .search-wrap { display: flex; align-items: center; gap: 10px; max-width: 500px; margin-bottom: 20px; padding: 0 14px; border: 1px solid var(--line); border-radius: 15px; background: rgba(255,255,255,.07); color: var(--lime); }
        .search-wrap input { width: 100%; border: 0; outline: 0; padding: 14px 0; color: var(--ink); background: transparent; font: 700 13px "DM Sans", sans-serif; }
        .search-wrap input::placeholder { color: #8b83b7; }
        .browse-body { display: grid; grid-template-columns: 188px minmax(0, 1fr); align-items: start; gap: 22px; }
        .rail { position: sticky; top: 18px; padding: 18px 15px; border: 1px solid var(--line); border-radius: 18px; background: rgba(21,11,75,.58); }
        .rail-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 17px; font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .rail-heading svg { color: var(--lime); }
        .filter-group { margin-top: 18px; }
        .filter-label { display: block; margin-bottom: 8px; color: #8077b8; font-size: 9px; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
        .filter-option { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 8px 7px; border: 0; border-radius: 8px; color: var(--muted); background: transparent; cursor: pointer; text-align: left; font: 700 11px "DM Sans", sans-serif; transition: background .2s, color .2s; }
        .filter-option:hover { color: var(--ink); background: rgba(255,255,255,.06); }
        .filter-option.active { color: var(--purple); background: var(--lime); }
        .filter-option svg { width: 13px; height: 13px; }
        .result-head { display: flex; align-items: center; justify-content: space-between; margin: 0 0 12px; }
        .result-head h2 { margin: 0; font-size: 15px; letter-spacing: -.02em; }
        .result-count { color: #8e86ba; font: 800 10px "DM Sans", sans-serif; }
        .game-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px; }
        .game-tile { min-height: 179px; padding: 15px; border: 1px solid var(--line); border-radius: 18px; background: linear-gradient(145deg, rgba(255,255,255,.105), rgba(255,255,255,.035)); cursor: pointer; transition: transform .22s, border-color .22s, background .22s; }
        .game-tile:hover { transform: translateY(-3px); border-color: rgba(183,247,0,.45); }
        .game-tile.selected { border-color: var(--lime); background: linear-gradient(145deg, rgba(183,247,0,.17), rgba(255,255,255,.055)); }
        .tile-top { display: flex; align-items: center; justify-content: space-between; }
        .tile-mark { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 9px; color: var(--purple); font: 900 10px "DM Sans", sans-serif; }
        .heart-button { display: grid; width: 28px; height: 28px; place-items: center; border: 0; border-radius: 50%; color: #a69dcb; background: rgba(0,0,0,.14); cursor: pointer; }
        .heart-button.saved { color: var(--lime); }
        .game-tile h3 { margin: 20px 0 7px; font: 900 20px/1 "Arial Black", "DM Sans", sans-serif; letter-spacing: -.06em; }
        .game-tile p { min-height: 38px; margin: 0; color: var(--muted); font-size: 11px; line-height: 1.42; }
        .tile-meta { display: flex; align-items: center; gap: 5px; margin-top: 15px; color: #a59ccb; font-size: 10px; font-weight: 800; }
        .tile-meta svg { width: 12px; color: var(--lime); }
        .empty-results { padding: 35px 18px; border: 1px dashed var(--line); border-radius: 18px; color: var(--muted); text-align: center; font-size: 12px; }
        .empty-results button { display: block; margin: 14px auto 0; border: 0; color: var(--lime); background: transparent; cursor: pointer; font: 800 11px "DM Sans", sans-serif; }
        .play-dock { position: fixed; left: 50%; bottom: 18px; z-index: 3; display: flex; align-items: center; gap: 14px; width: min(816px, calc(100% - 30px)); padding: 11px 12px 11px 14px; border: 1px solid rgba(183,247,0,.35); border-radius: 17px; background: rgba(26,14,84,.9); box-shadow: 0 15px 48px rgba(4,1,22,.42); transform: translateX(-50%); backdrop-filter: blur(18px); }
        .dock-mark { display: grid; flex: 0 0 auto; width: 38px; height: 38px; place-items: center; border-radius: 11px; color: var(--purple); font: 900 11px "DM Sans", sans-serif; }
        .dock-copy { min-width: 0; flex: 1; }
        .dock-kicker { display: block; margin-bottom: 3px; color: var(--lime); font: 900 9px "DM Sans", sans-serif; letter-spacing: .11em; text-transform: uppercase; }
        .dock-copy strong { display: block; overflow: hidden; color: var(--ink); font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
        .dock-copy span { display: block; overflow: hidden; margin-top: 2px; color: var(--muted); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
        .dock-start { display: flex; align-items: center; gap: 7px; padding: 11px 15px; border: 0; border-radius: 11px; color: var(--purple); background: var(--lime); cursor: pointer; font: 900 11px "DM Sans", sans-serif; }
        .dock-start svg { width: 13px; }
        .notice { position: fixed; left: 50%; bottom: 87px; z-index: 4; width: min(390px, calc(100% - 36px)); padding: 11px 14px; border: 1px solid rgba(183,247,0,.35); border-radius: 12px; color: var(--ink); background: var(--purple-2); box-shadow: 0 12px 30px rgba(0,0,0,.3); transform: translateX(-50%); font-size: 11px; font-weight: 800; }
        .notice button { float: right; border: 0; color: var(--lime); background: transparent; cursor: pointer; }
        .mobile-filter { display: none; }
        @media (max-width: 620px) {
          .browse-layout { padding: 20px 16px 122px; }
          .browse-intro { display: block; margin: 56px 0 28px; }
          .intro-copy { width: auto; max-width: 280px; margin-top: 17px; }
          .browse-body { display: block; }
          .rail { display: none; }
          .mobile-filter { display: flex; align-items: center; justify-content: space-between; margin-bottom: 17px; padding: 12px 13px; border: 1px solid var(--line); border-radius: 13px; color: var(--ink); background: rgba(255,255,255,.07); cursor: pointer; font: 800 11px "DM Sans", sans-serif; }
          .mobile-filter svg { color: var(--lime); }
          .mobile-filter-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px; margin: -7px 0 16px; border: 1px solid var(--line); border-radius: 13px; background: var(--purple-2); }
          .mobile-filter-panel .filter-group { margin: 0; }
          .mobile-filter-panel .filter-group:last-child { grid-column: 1 / -1; }
          .game-grid { grid-template-columns: 1fr; }
          .game-tile { min-height: 145px; }
          .game-tile h3 { margin-top: 15px; }
          .game-tile p { min-height: auto; }
        }
        @media (min-width: 621px) { .mobile-filter-panel { display: none; } }
      `}</style>

      <div className="browse-layout">
        <header className="browse-header">
          <div className="browse-logo">pres<i>.</i></div>
          <div className="header-note"><span className="live-dot" /> Friday night / 20:47</div>
        </header>

        <section className="browse-intro" aria-labelledby="browse-title">
          <div>
            <div className="eyebrow">The party starts here</div>
            <h1 id="browse-title" className="browse-title">Find your <span>kind</span> of chaos.</h1>
          </div>
          <p className="intro-copy">Browse the whole deck first. When something feels dangerous enough, pin it to the dock.</p>
        </section>

        <label className="search-wrap">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by mood, game or crime..." aria-label="Search games" />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={15} color="#aaa2d0" /></button>}
        </label>

        <button type="button" className="mobile-filter" onClick={() => setFilterOpen((current) => !current)}>
          <span><SlidersHorizontal size={14} style={{ verticalAlign: "middle", marginRight: 7 }} /> Tune the room</span>
          <ChevronDown size={14} style={{ transform: filterOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </button>
        {filterOpen && (
          <div className="mobile-filter-panel">
            <FilterGroup label="Format" options={categories} value={category} onChange={setCategory} />
            <FilterGroup label="Heat" options={heatLevels} value={heat} onChange={setHeat} />
            <FilterGroup label="Group size" options={["Any group", "2–3 players", "4+ players"]} value={players} onChange={setPlayers} />
          </div>
        )}

        <div className="browse-body">
          <aside className="rail" aria-label="Game filters">
            <div className="rail-heading"><span>Filter the deck</span><SlidersHorizontal size={15} /></div>
            <FilterGroup label="Format" options={categories} value={category} onChange={setCategory} />
            <FilterGroup label="Heat" options={heatLevels} value={heat} onChange={setHeat} />
            <FilterGroup label="Group size" options={["Any group", "2–3 players", "4+ players"]} value={players} onChange={setPlayers} />
          </aside>

          <section aria-labelledby="all-games">
            <div className="result-head">
              <h2 id="all-games">All games</h2>
              <span className="result-count">{filteredGames.length} of {games.length} showing</span>
            </div>
            {filteredGames.length ? (
              <div className="game-grid">
                {filteredGames.map((game) => (
                  <article key={game.id} className={`game-tile ${selectedId === game.id ? "selected" : ""}`} onClick={() => chooseGame(game.id)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") chooseGame(game.id); }}>
                    <div className="tile-top">
                      <span className="tile-mark" style={{ background: game.color }}>{game.mark}</span>
                      <button type="button" className={`heart-button ${saved.includes(game.id) ? "saved" : ""}`} aria-label={saved.includes(game.id) ? `Unsave ${game.title}` : `Save ${game.title}`} onClick={(event) => { event.stopPropagation(); toggleSaved(game.id); }}>
                        <Heart size={14} fill={saved.includes(game.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <div className="tile-meta"><Users size={12} /> {game.players}<span>·</span><Flame size={12} /> {game.heat}</div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <Sparkles size={19} color="#b7f700" />
                <p>Nothing matches that particular flavor of trouble.</p>
                <button type="button" onClick={() => { setCategory("All games"); setHeat("Any heat"); setPlayers("Any group"); setQuery(""); }}>Clear filters</button>
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="play-dock" role="region" aria-label="Selected game">
        <span className="dock-mark" style={{ background: selected.color }}>{selected.mark}</span>
        <div className="dock-copy">
          <span className="dock-kicker"><Check size={10} style={{ verticalAlign: "middle", marginRight: 3 }} /> Selected for tonight</span>
          <strong>{selected.title}</strong>
          <span>{selected.players} · {selected.heat} · {isSaved ? "Saved to your deck" : "Not saved yet"}</span>
        </div>
        <button type="button" className="dock-start" onClick={startGame}>Play <Play size={12} fill="currentColor" /></button>
      </div>
      {notice && <div className="notice" role="status">{notice}<button type="button" aria-label="Dismiss" onClick={() => setNotice("")}><X size={14} /></button></div>}
    </main>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      {options.map((option) => (
        <button type="button" className={`filter-option ${value === option ? "active" : ""}`} key={option} onClick={() => onChange(option)}>
          {option}
          {value === option && <Check />}
        </button>
      ))}
    </div>
  );
}

export default PresHomeBrowseRail;