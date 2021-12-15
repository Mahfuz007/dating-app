import { Member } from "./../../_models/member";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MemberService } from "src/app/_services/member.service";

@Component({
  selector: "app-member-details",
  templateUrl: "./member-details.component.html",
  styleUrls: ["./member-details.component.css"],
})
export class MemberDetailsComponent implements OnInit {
  member: Member;

  constructor(
    private activatedRouter: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.loadMemberData();
  }

  loadMemberData() {
    this.memberService
      .getMember(this.activatedRouter.snapshot.paramMap.get("username"))
      .subscribe((res) => {
        this.member = res;
      });
  }
}
