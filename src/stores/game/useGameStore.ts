import { create } from "zustand";
import type { GameStore } from "./game.type";
import { DIFFICULTE_CONFIG } from "./difficulteConfig";
import type { Difficulte } from "./difficulteConfig";
import type { PersonCard } from "../../types/person";
import { fetchPersonsByDifficulty } from "../../services/wikipedia/difficultyPersons.service";

function melangerTableau<T>(tableau: T[]): T[] {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

function estBienPlacee(
  timeline: PersonCard[],
  carte: PersonCard,
  position: number
): boolean {
  const carteGauche = timeline[position - 1];
  const carteDroite = timeline[position];

  const apresGauche =
    carteGauche?.anneeNaissance !== undefined && carte.anneeNaissance !== undefined
      ? carte.anneeNaissance >= carteGauche.anneeNaissance
      : true;

  const avantDroite =
    carteDroite?.anneeNaissance !== undefined && carte.anneeNaissance !== undefined
      ? carte.anneeNaissance <= carteDroite.anneeNaissance
      : true;

  return apresGauche && avantDroite;
}

// Taille du deck pré-chargé en réserve
const DECK_RESERVE_SIZE = 8;
// On recharge quand il reste moins de X cartes en réserve
const DECK_REFILL_THRESHOLD = 3;

type GameStoreInternal = GameStore & {
  deckReserve: PersonCard[];
};

export const useGameStore = create<GameStoreInternal>((set, get) => {
  // Fonction interne pour pré-charger des cartes en arrière-plan
  async function refillDeckReserve(difficulte: Difficulte) {
    const { deckReserve } = get();
    const existingIds = new Set([...deckReserve].map((c) => c.id));

    try {
      const nouvelles = await fetchPersonsByDifficulty(difficulte, DECK_RESERVE_SIZE);
      const sansDuplicates = nouvelles.filter((c) => !existingIds.has(c.id));

      set((state) => ({
        deckReserve: [...state.deckReserve, ...sansDuplicates],
      }));
    } catch (err) {
      console.warn("Erreur lors du rechargement du deck :", err);
    }
  }

  // Pioche une carte depuis la réserve (et recharge si nécessaire)
  function piocherDepuisReserve(difficulte: Difficulte): PersonCard | null {
    const { deckReserve } = get();
    if (deckReserve.length === 0) return null;

    const [carte, ...reste] = deckReserve;
    set({ deckReserve: reste });

    // Recharge en arrière-plan si la réserve devient faible
    if (reste.length < DECK_REFILL_THRESHOLD) {
      refillDeckReserve(difficulte);
    }

    return carte;
  }

  return {
    difficulte: "facile",
    modedejeux: "classique",
    vies: null,
    tempsLimite: null,
    categorieCarte: "legendaire",
    timeline: [],
    mainEnCours: [],
    deckReserve: [],
    vieRestante: null,
    score: 0,
    gameStatus: "idle",
    lastPlacementResult: null,
    trainningornot: false,

    actions: {
      setModeDeJeu: (mode) => {
        set({ modedejeux: mode });
      },

      startGame: async (difficulte: Difficulte) => {
        const { modedejeux } = get();

        set({
          gameStatus: "chargement",
          deckReserve: [],
          lastPlacementResult: null,
          score: 0,
          trainningornot: modedejeux === "entrainement",
        });

        try {
          const config = DIFFICULTE_CONFIG[difficulte];

          // Charge les cartes initiales + la réserve en parallèle
          const [cartesInitiales, cartesReserve] = await Promise.all([
            fetchPersonsByDifficulty(difficulte, 6), // 1 carte de départ + 5 en main
            fetchPersonsByDifficulty(difficulte, DECK_RESERVE_SIZE),
          ]);

          const deckMelange = melangerTableau(cartesInitiales);
          const [carteDepart, ...reste] = deckMelange;

          // Filtre la réserve pour éviter les doublons avec les cartes initiales
          const initialIds = new Set(cartesInitiales.map((c: PersonCard) => c.id));
          const reserveSansDuplicates = cartesReserve.filter(
            (c: PersonCard) => !initialIds.has(c.id)
          );

          set({
            difficulte,
            vies: config.vies,
            tempsLimite: config.limiteTemps,
            categorieCarte: config.niveauPopularite,
            vieRestante: config.vies,
            timeline: carteDepart ? [carteDepart] : [],
            mainEnCours: reste,
            deckReserve: reserveSansDuplicates,
            gameStatus: "En cours",
          });
        } catch (error) {
          console.error("Erreur lors du chargement des cartes :", error);
          set({ gameStatus: "idle" });
        }
      },

      placerCarte: (carteId: string, position: number) => {
        const { mainEnCours, timeline, vieRestante, difficulte, modedejeux, score } = get();

        const carte = mainEnCours.find((c) => c.id === carteId);
        if (!carte) return;

        const nouvelleMain = mainEnCours.filter((c) => c.id !== carteId);
        const placementCorrect = estBienPlacee(timeline, carte, position);

        // ── MODE CHALLENGE ──────────────────────────────────────────────
        // Une nouvelle carte est ajoutée systématiquement.
        // Bonne carte : +1 au score, on continue.
        // Mauvaise carte : fin de partie immédiate (score final = nb de bonnes cartes).
        if (modedejeux === "challenge") {
          if (placementCorrect) {
            const nouvelleTimeline = [
              ...timeline.slice(0, position),
              carte,
              ...timeline.slice(position),
            ];

            const nouvelleCarte = piocherDepuisReserve(difficulte);
            const mainApresPioche = nouvelleCarte
              ? [...nouvelleMain, nouvelleCarte]
              : nouvelleMain;

            set({
              timeline: nouvelleTimeline,
              mainEnCours: mainApresPioche,
              score: score + 1,
              gameStatus: "En cours",
              lastPlacementResult: "correct",
            });

            setTimeout(() => set({ lastPlacementResult: null }), 800);
          } else {
            // Erreur en challenge = fin de partie immédiate
            set({
              mainEnCours: nouvelleMain,
              gameStatus: "perdu",
              lastPlacementResult: "incorrect",
            });
          }
          return;
        }

        // ── MODE ENTRAÎNEMENT ────────────────────────────────────────────
        // Identique au classique sur le fond, sauf : jamais de perte de vie,
        // jamais de défaite. Une erreur pioche juste une nouvelle carte.
        if (modedejeux === "entrainement") {
          if (placementCorrect) {
            const nouvelleTimeline = [
              ...timeline.slice(0, position),
              carte,
              ...timeline.slice(position),
            ];

            const gameStatus = nouvelleMain.length === 0 ? "gagner" : "En cours";

            set({
              timeline: nouvelleTimeline,
              mainEnCours: nouvelleMain,
              gameStatus,
              lastPlacementResult: "correct",
            });

            setTimeout(() => set({ lastPlacementResult: null }), 800);
          } else {
            const nouvelleCarte = piocherDepuisReserve(difficulte);

            const mainApresPioche = nouvelleCarte
              ? [...nouvelleMain, nouvelleCarte]
              : nouvelleMain;

            set({
              mainEnCours: mainApresPioche,
              gameStatus: "En cours",
              lastPlacementResult: "incorrect",
            });

            setTimeout(() => set({ lastPlacementResult: null }), 800);
          }
          return;
        }

        // ── MODE CLASSIQUE (inchangé) ────────────────────────────────────
        if (placementCorrect) {
          //  Bonne position
          const nouvelleTimeline = [
            ...timeline.slice(0, position),
            carte,
            ...timeline.slice(position),
          ];

          const gameStatus = nouvelleMain.length === 0 ? "gagner" : "En cours";

          set({
            timeline: nouvelleTimeline,
            mainEnCours: nouvelleMain,
            gameStatus,
            lastPlacementResult: "correct",
          });

          // Reset le feedback après 800ms
          setTimeout(() => set({ lastPlacementResult: null }), 800);
        } else {
          //  Mauvaise position — pioche instantanée depuis la réserve
          const nouvelleCarte = piocherDepuisReserve(difficulte);

          const mainApresPioche = nouvelleCarte
            ? [...nouvelleMain, nouvelleCarte]
            : nouvelleMain;

          const nouvellesVies =
            vieRestante !== null ? vieRestante - 1 : null;

          const gameStatus =
            nouvellesVies !== null && nouvellesVies <= 0 ? "perdu" : "En cours";

          set({
            mainEnCours: mainApresPioche,
            vieRestante: nouvellesVies,
            gameStatus,
            lastPlacementResult: "incorrect",
          });

          // Reset le feedback après 800ms
          setTimeout(() => set({ lastPlacementResult: null }), 800);
        }
      },

      resetGame: () => {
        set({
          difficulte: "facile",
          modedejeux: "classique",
          vies: null,
          tempsLimite: null,
          categorieCarte: "legendaire",
          timeline: [],
          mainEnCours: [],
          deckReserve: [],
          vieRestante: null,
          score: 0,
          gameStatus: "idle",
          lastPlacementResult: null,
          trainningornot: false,
        });
      },
    },
  };
});