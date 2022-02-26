import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from "@angular/core";

import { Pagination } from './../../_models/pagination';
import { Member } from "../../_models/member";
import { MemberService } from "../../_services/member.service";
import { UserParams } from "src/app/_models/userParams";
import { take } from 'rxjs/operators';

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  memberList: Member[];
  paginationInfo: Pagination;
  userParams: UserParams;
  user: User;

  constructor(private memberService: MemberService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user => {
      this.user = user;
      this.userParams = new UserParams(user);
    }))
  }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.memberList = response.result;
      this.paginationInfo = response.pagination;
    })
  }

  onPageChange($event) {
    this.userParams.pageNumber = $event.page;
    this.loadMembers();
  }
}
