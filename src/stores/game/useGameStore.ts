import { create } from "zustand";
import type { GameStore } from "./game.type";
import { DIFFICULTE_CONFIG } from "./difficulteConfig";
import type { Difficulte } from "./difficulteConfig";
import type { PersonCard } from "../../types/person";

// Fonction pour mélanger un tableau
function melangerTableau<T>(tableau: T[]): T[] {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// Fonction qui vérifie si une carte est bien placée sur la timeline
// On lui donne la timeline actuelle, la carte à placer, et la position choisie
// Elle retourne true si la date de la carte est bien entre ses voisines
function estBienPlacee(
  timeline: PersonCard[],
  carte: PersonCard,
  position: number
): boolean {
  const carteGauche = timeline[position - 1];
  const carteDroite = timeline[position];

  const apresGauche = carteGauche?.anneeNaissance !== undefined && carte.anneeNaissance !== undefined
    ? carte.anneeNaissance >= carteGauche.anneeNaissance
    : true;

  const avantDroite = carteDroite?.anneeNaissance !== undefined && carte.anneeNaissance !== undefined
    ? carte.anneeNaissance <= carteDroite.anneeNaissance
    : true;

  return apresGauche && avantDroite;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // --- État initial ---
  // Ces valeurs sont des placeholders, elles seront écrasées par startGame()
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

    startGame: (difficulte: Difficulte) => {
      // 1. On récupère la config correspondant à la difficulté choisie
      const config = DIFFICULTE_CONFIG[difficulte];

      // 2. TODO : ici tu récupéreras les cartes filtrées par rareté depuis ton cardStore
      // Pour l'instant on part d'un deck vide, tu brancheras les vraies cartes plus tard
      const toutesLesCartes: PersonCard[] = []; // ← à remplacer

      // 3. On filtre par rareté et on mélange
      const deckMelange = melangerTableau(toutesLesCartes);

      // 4. La première carte va sur la timeline (date visible), les 5 suivantes en main
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
    },

    placerCarte: (carteId: string, position: number) => {
      // On lit l'état actuel avec get() — nécessaire quand on a besoin des valeurs actuelles
      const { mainEnCours, timeline, deck, vieRestante} = get();

      // 1. On trouve la carte dans la main du joueur
      const carte = mainEnCours.find((c) => c.id === carteId);
      if (!carte) return; // sécurité : si la carte n'existe pas on ne fait rien

      // 2. On retire la carte de la main dans tous les cas
      const nouvelleMain = mainEnCours.filter((c) => c.id !== carteId);

      // 3. On pioche une nouvelle carte si le deck n'est pas vide
      const [nouvelleCarte, ...nouveauDeck] = deck;
      const mainAvecPioche = nouvelleCarte
        ? [...nouvelleMain, nouvelleCarte]
        : nouvelleMain;

      if (estBienPlacee(timeline, carte, position)) {
        // ✅ Bonne position : on insère la carte dans la timeline à la bonne position
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

        // Vérifie si le joueur a gagné (plus de cartes en main)
        if (mainAvecPioche.length === 0) {
          set({ gameStatus: "gagner" });
        }

      } else {
        // ❌ Mauvaise position : on perd une vie
        const nouvellesVies = vieRestante !== null ? vieRestante - 1 : null;

        set({
          mainEnCours: mainAvecPioche,
          deck: nouveauDeck,
          vieRestante: nouvellesVies,
        });

        // Vérifie si le joueur a perdu (plus de vies)
        // vies === null = mode entrainement, on ne peut jamais perdre
        if (nouvellesVies !== null && nouvellesVies <= 0) {
          set({ gameStatus: "perdu" });
        }
      }
    },

    resetGame: () => {
      // Remet tout à zéro, prêt pour une nouvelle partie
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