import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Self,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.css"],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() type: string = "text";
  @Input() label: string = "name";

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
