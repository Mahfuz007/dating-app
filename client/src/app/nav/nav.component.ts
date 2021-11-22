import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "../_models/user";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) {}

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
          this.router.navigateByUrl("/members");
          this.toaster.success("Successfully Logged In!");
        },
        (err) => {
          this.toaster.error(err.error);
          console.log("err = ", err);
        }
      );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
    this.toaster.warning("logged Out!");
  }
}
