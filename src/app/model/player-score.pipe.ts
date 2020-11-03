import { Pipe, PipeTransform } from "@angular/core";
import { PlayerScore } from "./player-score.model";

@Pipe({ name: "asPlayerScore" })
export class PlayerScorePipe implements PipeTransform {
  transform(value: object): PlayerScore {
    return value as PlayerScore;
  }
}
