import { AccountService } from "./../../_services/account.service";
import { MemberService } from "src/app/_services/member.service";
import { User } from "./../../_models/user";
import { Member } from "./../../_models/member";
import { Component, HostListener, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"],
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;
  editForm: FormGroup;

  @HostListener("window:beforeunload", ["$event"]) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private _fb: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.initForm([]);
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.memberService
        .getMember(user.username)
        .pipe(take(1))
        .subscribe((member) => {
          this.member = member;
          this.initForm(this.member);
        });
    });
  }

  initForm(data?) {
    this.editForm = this._fb.group({
      introduction: [data && data.introduction ? data.introduction : ""],
      lookingFor: [data && data.lookingFor ? data.lookingFor : ""],
      interests: [data && data.interests ? data.interests : ""],
      city: [data && data.city ? data.city : ""],
      country: [data && data.country ? data.country : ""],
    });
  }

  getCurrentUser() {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  getMemberDetails(userName) {
    this.memberService
      .getMember(userName)
      .pipe(take(1))
      .subscribe((member) => (this.member = member));
  }

  onSaveChanges() {
    console.log("form value = ", this.editForm.value);
    this.memberService.updateMember(this.editForm.value).subscribe(() => {
      this.toast.success("Profile Updated successfully");
      this.editForm.reset(this.editForm.value);
    });
  }
}
