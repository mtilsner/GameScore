import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ScoreSheetService } from "src/app/services/score-sheet.service";
import { Sheet } from "../../model/sheet.model";
import { FieldGroup } from "./form-components/field-group";
import { ValueField } from "./form-components/value-field";

@Component({
  selector: "sheet-editor",
  templateUrl: "./sheet-editor.component.html",
  styleUrls: ["./sheet-editor.component.css"]
})
export class SheetEditorComponent {
  @Input() sheet: Sheet;
  @Input() selectedPlayer = null;

  private formGroup: FormGroup;

  public constructor(private scoreSheetService: ScoreSheetService) {}

  ngOnChanges() {
    this.createForm();
  }

  private createForm() {
    var fieldGroups = {};
    this.sheet.game.scoring.fields.forEach((field, index) => {
      var valueFields = {};
      this.sheet.values.forEach((value, pIndex) => {
        var fieldInput = new ValueField(value.values[index]);
        fieldInput.playerScore = value;
        valueFields["value_" + index + "_" + pIndex] = fieldInput;
      });
      var fieldGroup = new FieldGroup(valueFields);
      fieldGroup.field = field;
      fieldGroups["field_" + index] = fieldGroup;
    });
    this.formGroup = new FormGroup(fieldGroups);
    this.onChanges();
  }

  onChanges(): void {
    this.formGroup.valueChanges.subscribe((val) => {
      Object.values(val).forEach((values) => {
        Object.entries(values).forEach((entry) => {
          var [prefix, fieldId, playerId] = entry[0].split("_");
          this.sheet.values[parseInt(playerId, 10)].values[
            parseInt(fieldId, 10)
          ] = entry[1];
        });
      });
      this.scoreSheetService.save();
    });
  }
}
