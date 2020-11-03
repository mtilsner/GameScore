import { Game } from "./game.model";
import { PlayerScore } from "./player-score.model";

export class Sheet {
  title: string;
  created: Date;
  game: Game;
  values: PlayerScore[] = [];
}
