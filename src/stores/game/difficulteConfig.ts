import type { Rarete } from '../../types/person';

export type Difficulte = "facile" | "moyen" | "difficile" | "entrainement";
export interface DifficulteConfig {
    vies : number| null;
    limiteTemps:number | null;
    rareteCarteUtiliser: Rarete;
}

export const DIFFICULTE_CONFIG : Record<Difficulte, DifficulteConfig> = {
    facile: {
        vies: 5,
        limiteTemps:null,
        rareteCarteUtiliser: "legendaire",
    },
    moyen: {
        vies: 4,
        limiteTemps:60,
        rareteCarteUtiliser: "rare",
    },
    difficile: {
        vies: 3,
        limiteTemps:10,
        rareteCarteUtiliser: "peu_commune",
    },
    entrainement:{
        vies: null,
        limiteTemps: null,
        rareteCarteUtiliser: "legendaire",
    }
}