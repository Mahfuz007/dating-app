import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Member } from "../../_models/member";
import { MemberService } from "../../_services/member.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  memberList: Member[];
  page: Number = 1;
  pageSize: Number = 5;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.page, this.pageSize).subscribe(response => {
      this.memberList = response.result;
    })
  }
}
