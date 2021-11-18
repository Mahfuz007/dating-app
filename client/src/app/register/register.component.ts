import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
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
}
