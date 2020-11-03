import { Game } from "../model/game.model";
import { Injectable } from "@angular/core";
import { Sheet } from "../model/sheet.model";
import { PlayerScore } from "../model/player-score.model";

@Injectable({
  providedIn: "root"
})
export class ScoreSheetService {
  private KEY = "gamescore.sheets";

  private sheets: { [index: string]: Sheet[] } = {};

  public constructor() {
    this.load();
  }

  private load() {
    this.sheets = JSON.parse(window.localStorage.getItem(this.KEY));
    if (!this.sheets) {
      this.sheets = {};
    }
  }

  public save() {
    window.localStorage.setItem(this.KEY, JSON.stringify(this.sheets));
  }

  public createSheet(game: Game): Sheet {
    var sheet = new Sheet();
    sheet.created = new Date();
    sheet.game = game;
    for (var i = 0; i < game.maxPlayers; i++) {
      var playerScore = new PlayerScore();
      playerScore.color = this.getPlayerColors()[i];
      playerScore.values = new Array(game.scoring.fields.length);
      playerScore.values.fill(null);
      sheet.values.push(playerScore);
    }
    this.sheets[game.id].push(sheet);
    this.save();
    return sheet;
  }

  public getSheets(game: Game): Sheet[] {
    if (!this.sheets[game.id]) {
      this.sheets[game.id] = [];
      this.createSheet(game);
    }

    return this.sheets[game.id];
  }

  public getPlayerColors(): string[] {
    return [
      "#a52c59",
      "#006b5b",
      "#f0a714",
      "#33b5e5",
      "#b1b9d6",
      "#eececb",
      "#88976d"
    ];
  }
}
