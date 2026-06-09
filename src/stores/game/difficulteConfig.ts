import type { Rarete } from '../../types/person';

export type Difficulte = "facile" | "moyen" | "difficile" | "entrainement";
export interface DifficulteConfig {
    vies : number| null;
    limiteTemps:number | null;
    niveauPopularite : Rarete;
}

export const DIFFICULTE_CONFIG : Record<Difficulte, DifficulteConfig> = {
    facile: {
        vies: 5,
        limiteTemps:null,
        niveauPopularite : "legendaire",
    },
    moyen: {
        vies: 4,
        limiteTemps:60,
        niveauPopularite : "rare",
    },
    difficile: {
        vies: 3,
        limiteTemps:10,
        niveauPopularite : "peu_commune",
    },
    entrainement:{
        vies: null,
        limiteTemps: null,
        niveauPopularite : "legendaire",
    }
}