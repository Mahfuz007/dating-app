import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onRegistration() {
    this.accountService
      .register({
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (res) => {
          this.onCancel();
        },
        (err) => console.log("error: ", err)
      );
  }

  onCancel() {
    this.cancelRegistrationEvent.emit(false);
  }
}
