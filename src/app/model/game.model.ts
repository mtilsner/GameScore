import { Scoring } from "./scoring.model";

export class Game {
  id: string;
  title: string;
  maxPlayers: number;
  imageUrl: string;
  scoring: Scoring;
}
