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
      set({ gameStatus: "chargement" });

      try {
        const config = DIFFICULTE_CONFIG[difficulte];

        const toutesLesCartes = await fetchRandomPersons(15, config.niveauPopularite);
        const deckMelange = melangerTableau(toutesLesCartes);

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

      if (estBienPlacee(timeline, carte, position)) {
        // ✅ Bonne position : on place la carte, on NE pioche PAS
        const nouvelleTimeline = [
          ...timeline.slice(0, position),
          carte,
          ...timeline.slice(position),
        ];

        // Victoire si la main est maintenant vide
        const gameStatus = nouvelleMain.length === 0 ? "gagner" : "En cours";

        set({
          timeline: nouvelleTimeline,
          mainEnCours: nouvelleMain,
          gameStatus,
        });

      } else {
        // ❌ Mauvaise position : on défausse la carte et on pioche
        const [nouvelleCarte, ...nouveauDeck] = deck;
        const mainApresPioche = nouvelleCarte
          ? [...nouvelleMain, nouvelleCarte]
          : nouvelleMain;

        const nouvellesVies = vieRestante !== null ? vieRestante - 1 : null;
        const gameStatus =
          nouvellesVies !== null && nouvellesVies <= 0 ? "perdu" : "En cours";

        set({
          mainEnCours: mainApresPioche,
          deck: nouveauDeck,
          vieRestante: nouvellesVies,
          gameStatus,
        });
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
