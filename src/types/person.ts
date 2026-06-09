export type Rarete = "commune" | "peu_commune" | "rare" | "legendaire";

export type PersonCard = {
  id: string;
  wikipediaTitre: string;
  nom: string;
  anneeNaissance:string;
  description: string;
  imageUrl: string;
  ScorePopularite: number;
  rareter: Rarete;
  NbrVuPage: number;
  TailleArticle: number;
};
