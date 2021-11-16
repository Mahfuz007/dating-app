import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../_models/user";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn: boolean;
  currentUser: User;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.initForm();
    this.getCurrentUser();
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
          this.loggedIn = true;
        },
        (err) => {
          console.log("err = ", err);
        }
      );
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {
        this.loggedIn = !!user;
        this.currentUser = user;
      },
      (err) => {
        console.log("err = ", err);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }
}
