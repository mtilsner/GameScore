import { FormControl } from "@angular/forms";
import { PlayerScore } from "../../../model/player-score.model";

export class ValueField extends FormControl {
  playerScore: PlayerScore;
  fieldIndex: number;

  getValue(): number {
    return this.playerScore &&
      this.playerScore.values &&
      this.playerScore.values.length >= this.fieldIndex
      ? this.playerScore.values[this.fieldIndex]
      : null;
  }
}
