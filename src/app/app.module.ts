import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { PlayerScorePipe } from "./model/player-score.pipe";

import { AppRootComponent } from "./ui/app-root/app-root.component";
import { GameSelectorComponent } from "./ui/game-selector/game-selector.component";
import { SheetOrganizerComponent } from "./ui/sheet-organizer/sheet-organizer.component";
import { SheetEditorComponent } from "./ui/sheet-editor/sheet-editor.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppRootComponent,
    GameSelectorComponent,
    SheetOrganizerComponent,
    SheetEditorComponent,
    PlayerScorePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: GameSelectorComponent,
        data: { animation: "GameSelector" }
      },
      {
        path: "score/:gameId",
        component: SheetOrganizerComponent,
        data: { animation: "SheetOrganizer" }
      }
    ])
  ],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
