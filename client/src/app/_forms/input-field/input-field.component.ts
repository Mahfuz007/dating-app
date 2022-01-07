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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor, OnInit {
  @Input() type: string = "text";
  @Input() label: string = "name";

  inputField: FormGroup;

  onChange: any = () => {};
  onTouched: any = () => {};

  set value(value: any) {
    this.inputField.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.inputField = this.fb.group({
      name: [""],
    });

    this.inputField.valueChanges.subscribe(() => {
      console.log("form = ", this.inputField);
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.inputField.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
