import { environment } from "./../../../environments/environment";
import { Component, Input, OnInit } from "@angular/core";
import { Member } from "src/app/_models/member";
import { ImageUploaderOptions } from "ngx-image-uploader";
import { AccountService } from "src/app/_services/account.service";
import { User } from "src/app/_models/user";
import { take } from "rxjs/operators";
import { MemberService } from "src/app/_services/member.service";
import { Photo } from "src/app/_models/photo";

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

  constructor(
    private accountService: AccountService,
    private memberService: MemberService
  ) {}

  onUpload(file: any) {
    this.member.photos.push(file.response.body);
    if (file.response.body.isMain) {
      this.user.photoUrl = file.response.body.url;
      this.member.photoUrl = file.response.body.url;
      this.accountService.setCurrentUser(this.user);
    }
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

  setMainPhoto(photo: Photo) {
    this.memberService
      .setMainPhoto(photo.id)
      .pipe(take(1))
      .subscribe(() => {
        this.user.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);
        this.member.photoUrl = photo.url;
        this.member.photos.forEach((item) => {
          if (item.isMain == true) item.isMain = false;
          if (item.id == photo.id) item.isMain = true;
        });
      });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(
        (photo) => photo.id != photoId
      );
    });
  }
}
