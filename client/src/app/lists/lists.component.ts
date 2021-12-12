import { Component, OnInit } from "@angular/core";
import { Member } from "../_models/member";
import { MemberService } from "../_services/member.service";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"],
})
export class ListsComponent implements OnInit {
  memberList: Member[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe((res) => {
      this.memberList = res;
    });
  }
}
