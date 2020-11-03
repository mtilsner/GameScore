import { Game } from "../model/game.model";
import { Injectable } from "@angular/core";

import * as paladine from "../../assets/games/266810.json";
import * as architekten from "../../assets/games/236457.json";

@Injectable({
  providedIn: "root"
})
export class GameService {
  private games: Game[] = [];

  constructor() {
    this.games.push(architekten);
    this.games.push(paladine);
  }

  getGames() {
    return this.games;
  }

  getGame(gameId: string) {
    return this.games.find((game) => game.id === gameId);
  }
}
