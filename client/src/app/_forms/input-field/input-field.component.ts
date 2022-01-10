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
export class InputFieldComponent implements ControlValueAccessor, OnInit {
  @Input() type: string = "text";
  @Input() label: string = "name";

  errorMessages: any;
  errors: any = [];

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
    console.log("dd = ", this.ngControl.control);
    // this.setErrorMessage();
    this.ngControl.control.valueChanges.subscribe(() => {
      console.log("error before  = ", this.ngControl.control.errors);
      if (this.ngControl.control.errors) {
        this.errors = Object.entries(this.ngControl.control.errors);
        console.log("error = ", this.errors);
      }
    });
  }

  setErrorMessage() {
    this.errorMessages.set("required", () => `This field is required`);
    this.errorMessages.set(
      "minlength",
      () => `${this.label} must be at least three Characters`
    );
    this.errorMessages.set(
      "maxlength",
      () => `${this.label} must be at most Eight Characters`
    );
    this.errorMessages.set("isMatching", () => `Password does not match`);
  }

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
