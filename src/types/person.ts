export type Rarete = "commune" | "peu_commune" | "rare" | "legendaire";

export type PersonCard = {
  id: string;
  wikipediaTitre: string;
  nom: string;
  anneeNaissance?:number;
  description: string;
  imageUrl: string;
  ScorePopularite: number;
  rarete: Rarete;
  NbrVuPage: number;
  TailleArticle: number;
};
