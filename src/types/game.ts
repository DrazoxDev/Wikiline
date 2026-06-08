import type { PersonCard, Rarity } from "./person";
import Difficulte from '../pages/Difficulte';

export type ModeDeJeu = "entrainement" | "classique" | "gacha";

export type Difficulte = "facile" | "moyen" | "difficile";

export type GameConfig = {
  mode: ModeDeJeu;
  difficulte: Difficulte | null;
  vies: number | null;
  tailleMain: number;
  temps: number | null;
  RareteAccepte: Rarity[];
};

export type CarteDeJeu = PersonCard & {
  anneeNaissance: number;
  instanceId: string;
};

export type StatutJeu =
  | "idle"
  | "chargement"
  | "en cours"
  | "gagne"
  | "perdu"
  | "erreur";

export type ResultatPlacement = "correct" | "faux" | null;
