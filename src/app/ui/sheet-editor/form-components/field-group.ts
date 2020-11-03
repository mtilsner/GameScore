import { FormGroup } from "@angular/forms";
import { Field } from "../../../model/field.model";

export class FieldGroup extends FormGroup {
  field: Field;

  getTitle() {
    console.log("in here");
    console.log(this.field);
    console.log(this.field.title);
    return this.field.title;
  }
}
