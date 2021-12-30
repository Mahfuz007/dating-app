import { environment } from "./../../../environments/environment";
import { Component, Input, OnInit } from "@angular/core";
import { Member } from "src/app/_models/member";
import { ImageUploaderOptions } from "ngx-image-uploader";
import { AccountService } from "src/app/_services/account.service";
import { User } from "src/app/_models/user";
import { take } from "rxjs/operators";

@Component({
  selector: "app-photo-edit",
  templateUrl: "./photo-edit.component.html",
  styleUrls: ["./photo-edit.component.css"],
})
export class PhotoEditComponent implements OnInit {
  @Input("member") member: Member;
  user: User;
  baseUrl = environment.apiUrl;
  options: ImageUploaderOptions;

  constructor(private accountService: AccountService) {}

  onUpload(file: any) {
    this.member.photos.push(file.response.body);
  }

  ngOnInit() {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.setOptions();
    });
  }

  setOptions() {
    this.options = {
      thumbnailHeight: 220,
      thumbnailWidth: 320,
      uploadUrl: this.baseUrl + "users/add-photo",
      allowedImageTypes: ["image/png", "image/jpeg"],
      maxImageSize: 3,
      authToken: "Bearer " + this.user.token,
      autoUpload: false,
    };
  }
}
