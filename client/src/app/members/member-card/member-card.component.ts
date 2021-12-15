import { Member } from "./../../_models/member";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Input("member") member: Member;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToMemberDetails() {
    this.router.navigateByUrl("/member/" + this.member.username);
  }
}
