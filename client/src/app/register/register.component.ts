import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegistrationEvent = new EventEmitter();
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

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
    console.log("resiter form = ", this.registerForm);
  }

  onCancel() {
    this.cancelRegistrationEvent.emit(false);
  }
}
