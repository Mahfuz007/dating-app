import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
      confirmPassword: ["", Validators.required],
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
