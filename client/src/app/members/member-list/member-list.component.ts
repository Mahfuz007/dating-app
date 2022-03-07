import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from "@angular/core";

import { Pagination } from './../../_models/pagination';
import { Member } from "../../_models/member";
import { MemberService } from "../../_services/member.service";
import { UserParams } from "src/app/_models/userParams";
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  radioModel = "lastActive";

  genderList = [{value: 'male' , display: "Males"}, { value: 'female' , display: "Females"}];

  filtersForm: FormGroup;

  constructor(private memberService: MemberService, private fb: FormBuilder) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit() {
    this.initForm();
    this.loadMembers();
  }

  initForm() {
    this.filtersForm = this.fb.group({
      AgeFrom: [this.userParams.minAge],
      AgeTo: [this.userParams.maxAge],
      Gender: [this.userParams.gender]
    })
  }

  loadMembers() {
    this.userParams = this.memberService.getUserParams();
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.memberList = response.result;
      this.paginationInfo = response.pagination;
    })
  }

  onPageChange($event) {
    this.userParams.pageNumber = $event.page;
    this.memberService.setUserParams(this.userParams)
    this.loadMembers();
  }

  applyFilter() {
    this.setParamsValue();
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  setParamsValue() {
    this.userParams.minAge = this.filtersForm.value.AgeFrom;
    this.userParams.maxAge = this.filtersForm.value.AgeTo;
    this.userParams.gender = this.filtersForm.value.Gender;
  }

  resetFilter() {
    this.memberService.resetUserParams();
    this.loadMembers();
  }
 }
