import { create } from "zustand";
import type { GameStore } from "./game.type";
import { DIFFICULTE_CONFIG } from "./difficulteConfig";
import type { Difficulte } from "./difficulteConfig";
import type { PersonCard } from "../../types/person";
import { fetchRandomPersons } from "../../services/wikipedia/wikidata.sparql";

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

export const useGameStore = create<GameStore>((set, get) => ({
  difficulte: "facile",
  vies: null,
  tempsLimite: null,
  categorieCarte: "legendaire",
  timeline: [],
  mainEnCours: [],
  deck: [],
  vieRestante: null,
  gameStatus: "idle",

  actions: {

    startGame: async (difficulte: Difficulte) => {
      // Passe en chargement le temps de récupérer les cartes
      set({ gameStatus: "chargement" });

      try {
        const config = DIFFICULTE_CONFIG[difficulte];

        // Charge 6 cartes aléatoires depuis Wikipedia
        const toutesLesCartes = await fetchRandomPersons(15);
        const deckMelange = melangerTableau(toutesLesCartes);
        // 1ère carte sur la timeline, 5 suivantes en main
        const [carteDepart, ...reste] = deckMelange;
        const main = reste.slice(0, 5);
        const deck = reste.slice(5);

        set({
          difficulte,
          vies: config.vies,
          tempsLimite: config.limiteTemps,
          categorieCarte: config.niveauPopularite,
          vieRestante: config.vies,
          timeline: carteDepart ? [carteDepart] : [],
          mainEnCours: main,
          deck,
          gameStatus: "En cours",
        });

      } catch (error) {
        console.error("Erreur lors du chargement des cartes :", error);
        set({ gameStatus: "idle" });
      }
    },

    placerCarte: (carteId: string, position: number) => {
      const { mainEnCours, timeline, deck, vieRestante } = get();

      const carte = mainEnCours.find((c) => c.id === carteId);
      if (!carte) return;

      const nouvelleMain = mainEnCours.filter((c) => c.id !== carteId);

      const [nouvelleCarte, ...nouveauDeck] = deck;
      const mainAvecPioche = nouvelleCarte
        ? [...nouvelleMain, nouvelleCarte]
        : nouvelleMain;

      if (estBienPlacee(timeline, carte, position)) {
        const nouvelleTimeline = [
          ...timeline.slice(0, position),
          carte,
          ...timeline.slice(position),
        ];

        set({
          timeline: nouvelleTimeline,
          mainEnCours: mainAvecPioche,
          deck: nouveauDeck,
        });

        if (mainAvecPioche.length === 0) {
          set({ gameStatus: "gagner" });
        }

      } else {
        const nouvellesVies = vieRestante !== null ? vieRestante - 1 : null;

        set({
          mainEnCours: mainAvecPioche,
          deck: nouveauDeck,
          vieRestante: nouvellesVies,
        });

        if (nouvellesVies !== null && nouvellesVies <= 0) {
          set({ gameStatus: "perdu" });
        }
      }
    },

    resetGame: () => {
      set({
        difficulte: "facile",
        vies: null,
        tempsLimite: null,
        categorieCarte: "legendaire",
        timeline: [],
        mainEnCours: [],
        deck: [],
        vieRestante: null,
        gameStatus: "idle",
      });
    },
  },
}));