import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import imageBooster from "../../public/images/BoosterDeBase.png";
import { fetchRandomPersons } from "../services/wikipedia/wikidata.sparql";
import type { PersonCard } from "../types/person";
import { RARITY_LABELS } from "../services/wikipedia";

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────

const MAX_BOOSTERS        = 10;
const COOLDOWN_NORMAL_S   = 5 * 60;        // 5 min
const COOLDOWN_MYTHIQUE_S = 45 * 60;       // 45 min
const COOLDOWN_GOLD_S     = 7 * 60 * 60;  // 7 h

const STORAGE_KEY = "wikiline_booster_state";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (seconds <= 0) return "Disponible !";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}min ${String(s).padStart(2, "0")}s`;
  if (m > 0) return `${m}min ${String(s).padStart(2, "0")}s`;
  return `${s}s`;
}

/** Lit l'état persisté depuis localStorage */
function loadPersistedState(): {
  boosterCount: number;
  openedCount: number;
  nextNormalAt: number;    // timestamp ms
  nextMythiqueAt: number;
  nextGoldAt: number;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const now = Date.now();
  return {
    boosterCount: 4,
    openedCount: 0,
    nextNormalAt: now + COOLDOWN_NORMAL_S * 1000,
    nextMythiqueAt: now + COOLDOWN_MYTHIQUE_S * 1000,
    nextGoldAt: now + COOLDOWN_GOLD_S * 1000,
  };
}

function saveState(state: ReturnType<typeof loadPersistedState>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// Rareté
// ─────────────────────────────────────────────────────────────────────────────

const RARITY_STYLES: Record<string, { badge: string; glow: string; border: string }> = {
  legendaire:  { badge: "bg-amber-500",  glow: "shadow-[0_0_32px_8px_rgba(251,191,36,0.55)]",   border: "border-amber-400"  },
  rare:        { badge: "bg-purple-600", glow: "shadow-[0_0_28px_6px_rgba(147,51,234,0.5)]",    border: "border-purple-400" },
  peu_commune: { badge: "bg-blue-500",   glow: "shadow-[0_0_24px_4px_rgba(59,130,246,0.45)]",   border: "border-blue-400"   },
  commune:     { badge: "bg-gray-500",   glow: "shadow-[0_0_16px_2px_rgba(107,114,128,0.35)]",  border: "border-gray-400"   },
};

// ─────────────────────────────────────────────────────────────────────────────
// CardReveal
// ─────────────────────────────────────────────────────────────────────────────

type CardRevealProps = { card: PersonCard; index: number; revealed: boolean; onClick: () => void };

function CardReveal({ card, index, revealed, onClick }: CardRevealProps) {
  const styles = RARITY_STYLES[card.rarete] ?? RARITY_STYLES.commune;
  return (
    <div className="animate-[cardDrop_0.5s_ease-out_both]" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="relative w-40 h-60 cursor-pointer select-none" style={{ perspective: "900px" }} onClick={onClick}>
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{ transformStyle: "preserve-3d", transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Face cachée */}
          <div className="absolute inset-0 rounded-[1.8rem] overflow-hidden border-2 border-[#21897E]" style={{ backfaceVisibility: "hidden" }}>
            <div className="w-full h-full bg-[#21897E] flex flex-col items-center justify-center gap-3">
              <div className="text-white text-5xl font-bold opacity-30 select-none">W</div>
              <p className="text-white/60 text-xs font-soustitre">Cliquez pour révéler</p>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
            </div>
          </div>

          {/* Face révélée */}
          <div
            className={`absolute inset-0 rounded-[1.8rem] overflow-hidden border-2 ${styles.border} ${revealed ? styles.glow : ""} transition-shadow duration-500`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="bg-[#21897E] p-[3px] rounded-[1.8rem] h-full">
              <div className="bg-white rounded-[1.6rem] overflow-hidden h-full flex flex-col relative">
                <span className={`absolute top-3 right-3 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                  {RARITY_LABELS[card.rarete]}
                </span>
                {card.imageUrl
                  ? <img src={card.imageUrl} alt={card.nom} className="w-full h-32 object-cover object-top" />
                  : <div className="w-full h-32 bg-[#21897E]/20 flex items-center justify-center text-[#21897E] text-sm">?</div>
                }
                <div className="flex-1 flex flex-col justify-center items-center p-2 text-center overflow-hidden">
                  <p className="font-titre text-[#21897E] text-sm leading-tight">{card.nom}</p>
                  <p className="font-soustitre text-[10px] mt-1 text-gray-600 line-clamp-3">{card.description}</p>
                  {card.anneeNaissance && <p className="mt-1 font-bold text-[#21897E] text-xs">{card.anneeNaissance}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CountdownRow
// ─────────────────────────────────────────────────────────────────────────────

type CountdownRowProps = { label: string; secondsLeft: number; accent?: string };

function CountdownRow({ label, secondsLeft, accent = "text-[#21897E]" }: CountdownRowProps) {
  const ready = secondsLeft <= 0;
  return (
    <div className="text-center mb-[5%]">
      <h3 className="font-bold text-[#21897E] text-lg lg:text-xl">{label}</h3>
      <p className={`font-bold text-xl lg:text-2xl ${ready ? "text-green-500 animate-pulse" : accent}`}>
        {formatTime(secondsLeft)}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Phase = "idle" | "loading" | "shaking" | "opening" | "revealing" | "done";

// ─────────────────────────────────────────────────────────────────────────────
// Booster (main)
// ─────────────────────────────────────────────────────────────────────────────

const Booster = () => {
  // ── État persisté ──────────────────────────────────────────────────────────
  const persisted = useRef(loadPersistedState());
  const [boosterCount,   setBoosterCount]   = useState(persisted.current.boosterCount);
  const [openedCount,    setOpenedCount]    = useState(persisted.current.openedCount);
  const [nextNormalAt,   setNextNormalAt]   = useState(persisted.current.nextNormalAt);
  const [nextMythiqueAt, setNextMythiqueAt] = useState(persisted.current.nextMythiqueAt);
  const [nextGoldAt,     setNextGoldAt]     = useState(persisted.current.nextGoldAt);

  // ── Chronomètres affichés (secondes restantes) ─────────────────────────────
  const [secsNormal,   setSecsNormal]   = useState(Math.max(0, Math.round((nextNormalAt   - Date.now()) / 1000)));
  const [secsMythique, setSecsMythique] = useState(Math.max(0, Math.round((nextMythiqueAt - Date.now()) / 1000)));
  const [secsGold,     setSecsGold]     = useState(Math.max(0, Math.round((nextGoldAt     - Date.now()) / 1000)));

  // ── Jeu ───────────────────────────────────────────────────────────────────
  const [phase,    setPhase]    = useState<Phase>("idle");
  const [cards,    setCards]    = useState<PersonCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [error,    setError]    = useState<string | null>(null);

  // ── Tick chaque seconde ────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();

      setSecsNormal  (Math.max(0, Math.round((nextNormalAt   - now) / 1000)));
      setSecsMythique(Math.max(0, Math.round((nextMythiqueAt - now) / 1000)));
      setSecsGold    (Math.max(0, Math.round((nextGoldAt     - now) / 1000)));

      // Recharge automatique du booster normal quand le timer atteint 0
      setBoosterCount((prev) => {
        if (prev < MAX_BOOSTERS && now >= nextNormalAt) {
          const newCount = Math.min(MAX_BOOSTERS, prev + 1);
          const newNextAt = now + COOLDOWN_NORMAL_S * 1000;
          setNextNormalAt(newNextAt);
          // Persist
          saveState({
            boosterCount: newCount,
            openedCount,
            nextNormalAt: newNextAt,
            nextMythiqueAt,
            nextGoldAt,
          });
          return newCount;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [nextNormalAt, nextMythiqueAt, nextGoldAt, openedCount]);

  // ── Persist à chaque changement de compteurs ──────────────────────────────
  const persist = useCallback(() => {
    saveState({ boosterCount, openedCount, nextNormalAt, nextMythiqueAt, nextGoldAt });
  }, [boosterCount, openedCount, nextNormalAt, nextMythiqueAt, nextGoldAt]);

  useEffect(() => { persist(); }, [persist]);

  // ── Ouverture ──────────────────────────────────────────────────────────────
  const canOpen = boosterCount > 0 && phase === "idle";

  async function handleOpenBooster() {
    if (!canOpen) return;
    setError(null);
    setPhase("loading");

    let drawn: PersonCard[] = [];
    try {
      drawn = await fetchRandomPersons(8);
      if (drawn.length === 0) throw new Error("Aucune personnalité trouvée");
      drawn = drawn.slice(0, 5);
    } catch {
      setError("Impossible de charger les cartes. Vérifiez votre connexion.");
      setPhase("idle");
      return;
    }

    setPhase("shaking");

    setTimeout(() => {
      setCards(drawn);
      setRevealed(new Array(drawn.length).fill(false));
      setPhase("opening");

      setTimeout(() => {
        setPhase("revealing");

        // Décrémente le stock et relance le timer si le stock passe sous le max
        setBoosterCount((prev) => {
          const newCount = prev - 1;
          if (prev === MAX_BOOSTERS) {
            // Démarre le cooldown seulement si le stock était plein (plus de timer actif)
            const newNextAt = Date.now() + COOLDOWN_NORMAL_S * 1000;
            setNextNormalAt(newNextAt);
          }
          return newCount;
        });
        setOpenedCount((c) => c + 1);
      }, 600);
    }, 900);
  }

  function handleRevealCard(index: number) {
    if (phase !== "revealing") return;
    setRevealed((prev) => {
      const next = [...prev];
      next[index] = true;
      if (next.every(Boolean)) setTimeout(() => setPhase("done"), 400);
      return next;
    });
  }

  function handleRevealAll() {
    setRevealed(new Array(cards.length).fill(true));
    setTimeout(() => setPhase("done"), 800);
  }

  function handleReset() {
    setPhase("idle");
    setCards([]);
    setRevealed([]);
    setError(null);
  }

  const allRevealed = revealed.every(Boolean) && revealed.length > 0;

  // ─────────────────────────────────────────────────────────────────────────
  // Rendu
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      {phase === "opening" && (
        <div className="fixed inset-0 z-50 bg-white animate-[flashFade_0.6s_ease-out_forwards] pointer-events-none" />
      )}

      <section className="w-full px-[3%] py-[2%]">

        {/* ── VUE BOOSTER ─────────────────────────────────────────────────── */}
        {(phase === "idle" || phase === "loading" || phase === "shaking" || phase === "opening") && (
          <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-[3%]">

            {/* Image booster */}
            <div className="w-full lg:w-[40%] bg-[#21897E] rounded-[2rem] flex items-center justify-center p-[3%] overflow-hidden relative">
              <img
                src={imageBooster}
                alt="Booster"
                className={`w-[75%] h-auto object-contain
                  ${phase === "shaking" ? "animate-[boosterShake_0.9s_ease-in-out]" : ""}
                  ${phase === "opening" ? "animate-[boosterExplode_0.6s_ease-in_forwards]" : ""}
                `}
              />
              {phase === "loading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#21897E]/80 rounded-[2rem] gap-4">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white font-soustitre text-sm">Chargement depuis Wikipedia…</p>
                </div>
              )}
            </div>

            {/* Panneau */}
            <div className="w-full lg:w-[57%] flex flex-col">
              <div className="text-center mb-[3%]">
                <h2 className="font-soustitre text-3xl md:text-4xl lg:text-5xl">Ouverture de</h2>
                <h1 className="font-titre text-[#21897E] text-5xl md:text-7xl lg:text-8xl">Booster</h1>
              </div>

              <div className="flex-1 border-[5px] border-[#21897E] rounded-[2rem] p-[4%] flex flex-col">

                {/* Stock */}
                <div className="text-center mb-[5%]">
                  <h3 className="font-bold text-[#21897E] text-lg lg:text-xl">Nombre de boosters :</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    {Array.from({ length: MAX_BOOSTERS }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full border-2 border-[#21897E] transition-all duration-300 ${
                          i < boosterCount ? "bg-[#21897E]" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-[#21897E] text-xl mt-1">{boosterCount} / {MAX_BOOSTERS}</p>
                </div>

                {/* Chronomètres */}
                <CountdownRow
                  label="Prochain booster dans :"
                  secondsLeft={boosterCount >= MAX_BOOSTERS ? 0 : secsNormal}
                />
                <CountdownRow
                  label="Prochain booster mythique dans :"
                  secondsLeft={secsMythique}
                  accent="text-amber-500"
                />
                <CountdownRow
                  label="Prochain booster gold dans :"
                  secondsLeft={secsGold}
                  accent="text-yellow-600"
                />

                {error && (
                  <p className="text-red-500 text-sm text-center font-soustitre mb-4">{error}</p>
                )}

                <div className="mt-auto flex flex-col gap-3">
                  <button
                    onClick={handleOpenBooster}
                    disabled={!canOpen}
                    className={`w-full rounded-[1.5rem] py-[4%] text-center font-bold text-xl md:text-2xl lg:text-3xl transition-all duration-200
                      ${canOpen
                        ? "bg-[#21897E] text-white hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {phase === "loading" ? "⏳ Chargement…"
                      : phase === "shaking" ? "Ouverture…"
                      : boosterCount === 0 ? "Plus de boosters"
                      : "✨ Ouvrir un booster"}
                  </button>

                  <div className="bg-[#21897E] rounded-[1.5rem] py-[3%] text-center">
                    <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
                      Boosters ouverts : {openedCount}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── VUE RÉVÉLATION ─────────────────────────────────────────────── */}
        {(phase === "revealing" || phase === "done") && cards.length > 0 && (
          <div className="flex flex-col items-center gap-8 py-4">
            <div className="text-center">
              <h2 className="font-soustitre text-2xl text-gray-500">Vous avez obtenu</h2>
              <h1 className="font-titre text-[#21897E] text-6xl">{cards.length} cartes !</h1>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {cards.map((card, i) => (
                <CardReveal
                  key={card.id + i}
                  card={card}
                  index={i}
                  revealed={revealed[i] ?? false}
                  onClick={() => handleRevealCard(i)}
                />
              ))}
            </div>

            {!allRevealed && phase === "revealing" && (
              <p className="font-soustitre text-gray-400 text-sm animate-pulse">
                Cliquez sur chaque carte pour la révéler
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {!allRevealed && (
                <button
                  onClick={handleRevealAll}
                  className="bg-[#21897E]/20 border-2 border-[#21897E] text-[#21897E] font-bold px-8 py-3 rounded-2xl hover:bg-[#21897E] hover:text-white transition-all duration-200"
                >
                  Tout révéler
                </button>
              )}
              {(allRevealed || phase === "done") && (
                <button
                  onClick={handleReset}
                  className="bg-[#21897E] text-white font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {boosterCount > 0 ? "Ouvrir un autre booster" : "Retour"}
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes boosterShake {
          0%   { transform: rotate(0deg)  scale(1);    }
          10%  { transform: rotate(-6deg) scale(1.04); }
          20%  { transform: rotate(6deg)  scale(1.06); }
          30%  { transform: rotate(-5deg) scale(1.05); }
          40%  { transform: rotate(5deg)  scale(1.07); }
          50%  { transform: rotate(-4deg) scale(1.06); }
          60%  { transform: rotate(4deg)  scale(1.05); }
          70%  { transform: rotate(-3deg) scale(1.04); }
          80%  { transform: rotate(3deg)  scale(1.05); }
          90%  { transform: rotate(-2deg) scale(1.03); }
          100% { transform: rotate(0deg)  scale(1.08); }
        }
        @keyframes boosterExplode {
          0%   { transform: scale(1.08); opacity: 1; }
          60%  { transform: scale(1.6) rotate(8deg);  opacity: 0.6; }
          100% { transform: scale(2.2) rotate(15deg); opacity: 0;   }
        }
        @keyframes flashFade {
          0%   { opacity: 0.95; }
          100% { opacity: 0;    }
        }
        @keyframes cardDrop {
          0%   { opacity: 0; transform: translateY(-40px) scale(0.85); }
          70%  { transform: translateY(6px) scale(1.02);               }
          100% { opacity: 1; transform: translateY(0) scale(1);        }
        }
      `}</style>
    </>
  );
};

export default Booster;
