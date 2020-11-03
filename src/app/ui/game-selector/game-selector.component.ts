import { Component } from "@angular/core";
import { GameService } from "../../services/game.service";
import { Game } from "../../model/game.model";

@Component({
  selector: "game-selector",
  templateUrl: "./game-selector.component.html",
  styleUrls: ["./game-selector.component.css"]
})
export class GameSelectorComponent {
  private allGames: Game[];
  public games: Game[];

  public constructor(gameService: GameService) {
    this.allGames = gameService.getGames();
    this.filter();
  }

  private filter(filterValue = "") {
    if (filterValue) {
      this.games = this.allGames.filter(
        (game) =>
          game.title.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1
      );
    } else {
      this.games = this.allGames;
    }
  }

  public select(game: Game) {}
}
