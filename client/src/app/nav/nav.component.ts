import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn: boolean;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  login() {
    this.accountService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (res) => {
          console.log("res = ", res);
          this.loggedIn = true;
        },
        (err) => {
          console.log("err = ", err);
        }
      );
  }

  logout() {
    this.loggedIn = false;
  }
}
