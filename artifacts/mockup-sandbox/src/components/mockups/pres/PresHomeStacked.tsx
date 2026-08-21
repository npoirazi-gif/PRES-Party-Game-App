import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  ChevronRight,
  Compass,
  Flame,
  Gamepad2,
  Heart,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

type Game = {
  id: string;
  title: string;
  description: string;
  label: string;
  meta: string;
  heat: string;
  color: string;
  mark: string;
};

const games: Game[] = [
  {
    id: "most-likely",
    title: "Most Likely To",
    description: "Point fingers and settle debates on who is the absolute worst.",
    label: "VOTING",
    meta: "4+ players",
    heat: "Spicy",
    color: "#B7F700",
    mark: "01",
  },
  {
    id: "never-have",
    title: "Never Have I Ever",
    description: "Expose your friends' deepest secrets before the pub.",
    label: "ICEBREAKER",
    meta: "3+ players",
    heat: "Mild",
    color: "#FFB1C3",
    mark: "02",
  },
  {
    id: "rather",
    title: "Would You Rather",
    description: "Terrible choices for terrible people. Pick your poison.",
    label: "DILEMMA",
    meta: "2+ players",
    heat: "Medium",
    color: "#B8C3FF",
    mark: "03",
  },
];

const vibes = ["Pub Pres", "House Pres", "Club Pres", "Unhinged Pres"];

const iconButtonStyle: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.13)",
  background: "rgba(255,255,255,.075)",
  color: "#fff",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

export function PresHomeStacked() {
  const [activeVibe, setActiveVibe] = useState("Pub Pres");
  const [activeGame, setActiveGame] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [started, setStarted] = useState(false);

  const featured = games[activeGame];
  const remaining = useMemo(
    () => games.filter((_, index) => index !== activeGame),
    [activeGame],
  );

  const startGame = () => setStarted(true);
  const toggleSaved = (id: string) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="pres-shell">
      <style>{`
        .pres-shell {
          --ink: #fffaf3;
          --muted: #b9b2e6;
          --violet: #140b4a;
          --violet-2: #21106b;
          --violet-3: #2c1496;
          --coral: #ff6b4a;
          min-height: 100dvh;
          color: var(--ink);
          background:
            radial-gradient(circle at 86% 9%, rgba(255,107,74,.22), transparent 25%),
            radial-gradient(circle at 2% 75%, rgba(83,40,252,.22), transparent 28%),
            var(--violet);
          font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
          position: relative;
        }
        .pres-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .13;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.33'/%3E%3C/svg%3E");
          mix-blend-mode: screen;
        }
        .pres-content { max-width: 520px; min-height: 100dvh; margin: 0 auto; padding: 22px 20px 26px; position: relative; z-index: 1; }
        .pres-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .pres-logo { color: #fff; letter-spacing: -.08em; font: 900 30px/1 "Arial Black", "DM Sans", sans-serif; }
        .pres-logo i { color: #b7f700; font-style: normal; }
        .pres-actions { display: flex; gap: 8px; }
        .pres-search { display: flex; align-items: center; gap: 8px; flex: 1; animation: presIn .2s ease both; }
        .pres-search input { min-width: 0; flex: 1; color: #fff; outline: none; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; padding: 11px 13px; background: rgba(255,255,255,.09); font: 600 13px "DM Sans", sans-serif; }
        .pres-search input::placeholder { color: #b9b2e6; }
        .pres-kicker { margin: 48px 0 8px; color: #ffb1c3; font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
        .pres-title { max-width: 350px; margin: 0; font: 800 47px/.92 "Arial Black", "DM Sans", sans-serif; letter-spacing: -.07em; }
        .pres-title span { color: #b7f700; }
        .pres-subtitle { color: var(--muted); max-width: 275px; margin: 16px 0 28px; font-size: 14px; line-height: 1.45; }
        .vibe-label { color: rgba(255,255,255,.57); font-size: 10px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 9px; }
        .vibe-row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; margin: 0 -20px; padding: 0 20px 3px; }
        .vibe-row::-webkit-scrollbar { display: none; }
        .vibe-pill { flex: none; cursor: pointer; border: 1px solid rgba(255,255,255,.14); border-radius: 99px; color: #d9d2fb; background: rgba(255,255,255,.07); font: 700 12px "DM Sans", sans-serif; padding: 10px 14px; transition: transform .18s ease, background .18s ease, color .18s ease; }
        .vibe-pill:active { transform: scale(.96); }
        .vibe-pill.active { color: #140b4a; background: #b7f700; border-color: #b7f700; }
        .feature-wrap { margin-top: 26px; }
        .section-head { display: flex; align-items: end; justify-content: space-between; margin-bottom: 11px; }
        .section-head h2 { margin: 0; font-size: 18px; letter-spacing: -.04em; }
        .section-head button, .see-all { border: 0; color: #ffb1c3; background: transparent; font: 800 11px "DM Sans", sans-serif; cursor: pointer; letter-spacing: .04em; }
        .feature-card { min-height: 257px; border-radius: 25px; padding: 20px; background: var(--violet-3); border: 1px solid rgba(255,255,255,.14); position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.2); animation: presLift .36s ease both; }
        .feature-card::after { content: ""; position: absolute; width: 170px; height: 170px; right: -45px; bottom: -56px; border: 25px solid color-mix(in srgb, var(--feature-color) 54%, transparent); border-radius: 50%; transform: rotate(-18deg); }
        .feature-top { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; }
        .tag { border-radius: 7px; padding: 6px 8px; background: var(--feature-color); color: #140b4a; font-size: 9px; font-weight: 900; letter-spacing: .13em; }
        .card-number { color: rgba(255,255,255,.42); font: 800 12px "Space Mono", monospace; }
        .feature-card h3 { max-width: 270px; margin: 34px 0 8px; font: 800 35px/.95 "Arial Black", "DM Sans", sans-serif; letter-spacing: -.07em; position: relative; z-index: 1; }
        .feature-card p { color: #dbd4f8; max-width: 285px; min-height: 41px; margin: 0; font-size: 13px; line-height: 1.35; position: relative; z-index: 1; }
        .feature-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 22px; position: relative; z-index: 1; }
        .meta { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.65); font-size: 11px; font-weight: 700; }
        .meta-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--feature-color); }
        .play-button { display: flex; align-items: center; gap: 8px; cursor: pointer; border: 0; border-radius: 12px; padding: 11px 13px; color: #140b4a; background: #fffaf3; font: 900 11px "DM Sans", sans-serif; }
        .play-button svg { fill: #140b4a; }
        .game-list { display: grid; gap: 9px; margin-top: 18px; }
        .game-row { display: flex; align-items: center; gap: 13px; width: 100%; cursor: pointer; text-align: left; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 11px 12px; color: var(--ink); background: rgba(44,20,150,.62); transition: transform .18s ease, background .18s ease; }
        .game-row:hover { transform: translateX(3px); background: rgba(83,40,252,.6); }
        .game-swatch { width: 46px; height: 46px; flex: none; display: grid; place-items: center; color: #140b4a; border-radius: 13px; font: 900 13px "Space Mono", monospace; }
        .game-copy { min-width: 0; flex: 1; }
        .game-copy strong { display: block; font-size: 14px; letter-spacing: -.025em; }
        .game-copy span { display: block; overflow: hidden; color: #b9b2e6; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; margin-top: 4px; }
        .save { display: grid; place-items: center; width: 31px; height: 31px; flex: none; border: 0; border-radius: 10px; color: #b9b2e6; background: rgba(255,255,255,.07); cursor: pointer; }
        .save.saved { color: #ffb1c3; background: rgba(255,177,195,.14); }
        .bottom-nav { display: flex; align-items: center; justify-content: space-around; margin: 30px -4px 0; padding: 10px 4px 5px; border-top: 1px solid rgba(255,255,255,.12); }
        .nav-item { display: grid; justify-items: center; gap: 5px; border: 0; color: #8077b8; background: transparent; cursor: pointer; font: 700 10px "DM Sans", sans-serif; }
        .nav-item.active { color: #b7f700; }
        .nav-item svg { width: 19px; height: 19px; }
        .started-toast { position: fixed; left: 50%; bottom: 22px; z-index: 4; transform: translateX(-50%); width: calc(100% - 40px); max-width: 420px; border: 1px solid rgba(183,247,0,.38); border-radius: 15px; padding: 13px 15px; background: #21106b; color: #fff; display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 700; box-shadow: 0 15px 40px rgba(0,0,0,.35); animation: presLift .25s ease both; }
        .started-toast button { border: 0; color: #b7f700; background: transparent; cursor: pointer; font-size: 18px; }
        @keyframes presIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes presLift { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (min-width: 520px) { .pres-content { padding-left: 25px; padding-right: 25px; } .vibe-row { margin-left: -25px; margin-right: -25px; padding-left: 25px; padding-right: 25px; } }
      `}</style>

      <div className="pres-content">
        <header className="pres-topbar">
          {searchOpen ? (
            <div className="pres-search">
              <Search size={17} color="#b7f700" />
              <input autoFocus placeholder="Find a game..." aria-label="Find a game" />
              <button
                type="button"
                aria-label="Close search"
                style={iconButtonStyle}
                onClick={() => setSearchOpen(false)}
              >
                <X size={17} />
              </button>
            </div>
          ) : (
            <>
              <div className="pres-logo">pres<i>.</i></div>
              <div className="pres-actions">
                <button type="button" aria-label="Search games" style={iconButtonStyle} onClick={() => setSearchOpen(true)}>
                  <Search size={17} />
                </button>
                <button type="button" aria-label="Filter games" style={iconButtonStyle} onClick={() => setActiveVibe("Unhinged Pres")}>
                  <SlidersHorizontal size={17} />
                </button>
              </div>
            </>
          )}
        </header>

        <section aria-labelledby="greeting">
          <p className="pres-kicker">Friday night / 20:47</p>
          <h1 id="greeting" className="pres-title">
            Pick your <span>poison.</span>
          </h1>
          <p className="pres-subtitle">No setup. No sign up. Just pass the phone and let the group chat judge.</p>
        </section>

        <section aria-label="Choose a pres vibe">
          <div className="vibe-label">What&apos;s the vibe?</div>
          <div className="vibe-row">
            {vibes.map((vibe) => (
              <button
                type="button"
                className={`vibe-pill ${activeVibe === vibe ? "active" : ""}`}
                key={vibe}
                onClick={() => {
                  setActiveVibe(vibe);
                  setStarted(false);
                }}
              >
                {vibe}
              </button>
            ))}
          </div>
        </section>

        <section className="feature-wrap" aria-labelledby="tonight">
          <div className="section-head">
            <h2 id="tonight">Tonight&apos;s pick</h2>
            <button type="button" onClick={() => setActiveGame((current) => (current + 1) % games.length)}>
              Shuffle <Sparkles size={12} style={{ verticalAlign: "middle", marginLeft: 4 }} />
            </button>
          </div>
          <article
            className="feature-card"
            style={{ "--feature-color": featured.color } as CSSProperties}
            key={`${featured.id}-${activeVibe}`}
          >
            <div className="feature-top">
              <span className="tag">{featured.label}</span>
              <span className="card-number">{featured.mark} / 03</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <div className="feature-bottom">
              <div className="meta">
                <Users size={14} />
                {featured.meta}
                <span className="meta-dot" />
                <Flame size={14} />
                {featured.heat}
              </div>
              <button type="button" className="play-button" onClick={startGame}>
                Start <Play size={12} />
              </button>
            </div>
          </article>
        </section>

        <section className="game-list" aria-label="More games">
          <div className="section-head" style={{ marginTop: 2 }}>
            <h2>More ways to cause chaos</h2>
            <button type="button" className="see-all" onClick={() => setActiveGame(0)}>See all <ChevronRight size={12} style={{ verticalAlign: "middle" }} /></button>
          </div>
          {remaining.map((game) => (
            <div
              role="button"
              tabIndex={0}
              className="game-row"
              key={game.id}
              onClick={() => {
                setActiveGame(games.findIndex((item) => item.id === game.id));
                setStarted(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActiveGame(games.findIndex((item) => item.id === game.id));
                  setStarted(false);
                }
              }}
            >
              <span className="game-swatch" style={{ background: game.color }}>{game.mark}</span>
              <span className="game-copy">
                <strong>{game.title}</strong>
                <span>{game.description}</span>
              </span>
              <span
                className={`save ${saved.includes(game.id) ? "saved" : ""}`}
                role="button"
                aria-label={saved.includes(game.id) ? `Remove ${game.title} from saved` : `Save ${game.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSaved(game.id);
                }}
              >
                <Heart size={15} fill={saved.includes(game.id) ? "currentColor" : "none"} />
              </span>
            </div>
          ))}
        </section>

        <nav className="bottom-nav" aria-label="Primary navigation">
          <button type="button" className="nav-item active" onClick={() => setStarted(false)}><Gamepad2 /><span>Games</span></button>
          <button type="button" className="nav-item" onClick={() => setActiveVibe("Surprise Me")}><Compass /><span>Vibes</span></button>
          <button type="button" className="nav-item" onClick={() => setSaved([])}><Star /><span>Saved</span></button>
        </nav>
      </div>

      {started && (
        <div className="started-toast" role="status">
          <span>{featured.title} is ready. Pass the phone to the first victim.</span>
          <button type="button" aria-label="Dismiss" onClick={() => setStarted(false)}>×</button>
        </div>
      )}
    </main>
  );
}

export default PresHomeStacked;