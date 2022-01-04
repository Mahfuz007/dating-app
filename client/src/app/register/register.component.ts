import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegistrationEvent = new EventEmitter();
  registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private accountService: AccountService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this._fb.group({
      username: ["", Validators.required],
      password: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        "",
        [Validators.required, this.matchPassword["password"]],
      ],
    });

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchPassword(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatch: true };
    };
  }

  onRegistration() {
    this.accountService
      .register({
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (res) => {
          this.toaster.success("Successfully registered!");
          this.onCancel();
          this.toaster.success("Successfully Logged In!");
        },
        (err) => console.log("error: ", err)
      );
  }

  onCancel() {
    this.cancelRegistrationEvent.emit(false);
  }
}
