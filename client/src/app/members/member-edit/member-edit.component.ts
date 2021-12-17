import { AccountService } from "./../../_services/account.service";
import { MemberService } from "src/app/_services/member.service";
import { User } from "./../../_models/user";
import { Member } from "./../../_models/member";
import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"],
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }
}
