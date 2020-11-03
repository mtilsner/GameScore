import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameService } from "../../services/game.service";
import { ScoreSheetService } from "../../services/score-sheet.service";
import { Game } from "../../model/game.model";
import { Sheet } from "../../model/sheet.model";
import { PlayerScore } from "src/app/model/player-score.model";

@Component({
  selector: "sheet-organizer",
  templateUrl: "./sheet-organizer.component.html",
  styleUrls: ["./sheet-organizer.component.css"]
})
export class SheetOrganizerComponent {
  private game: Game;
  private sheets: Sheet[];
  private currentSheetIndex = -1;

  public constructor(
    private gameService: GameService,
    private scoreSheetService: ScoreSheetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.game = this.gameService.getGame(params.get("gameId"));
      this.sheets = this.scoreSheetService.getSheets(this.game);
      this.currentSheetIndex = this.sheets.length - 1;
    });
    if (this.currentSheetIndex === -1) {
      this.createSheet();
    }
  }

  createSheet() {
    this.currentSheetIndex++;
    this.scoreSheetService.createSheet(this.game);
  }

  deleteCurrentSheet() {
    if (
      window.confirm(
        "Möchten Sie den aktuellen Bogen '" +
          this.sheets[this.currentSheetIndex].title +
          "' wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden!"
      )
    ) {
      this.sheets.splice(this.currentSheetIndex, 1);
      if (this.currentSheetIndex > this.sheets.length - 1) {
        this.currentSheetIndex = this.sheets.length - 1;
      }
      if (this.currentSheetIndex === -1) {
        this.createSheet();
      }
      this.scoreSheetService.save();
    }
  }

  public togglePlayer(playerIndex) {
    this.sheets[this.currentSheetIndex].values[playerIndex].hidden = !this
      .sheets[this.currentSheetIndex].values[playerIndex].hidden;
    this.scoreSheetService.save();
  }

  public calculateScore(playerScore: PlayerScore) {
    return playerScore.values.reduce((sum, value) => sum + (value ? value : 0));
  }
}
