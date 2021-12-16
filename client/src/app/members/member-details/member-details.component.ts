import { Member } from "./../../_models/member";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MemberService } from "src/app/_services/member.service";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "@kolkov/ngx-gallery";

@Component({
  selector: "app-member-details",
  templateUrl: "./member-details.component.html",
  styleUrls: ["./member-details.component.css"],
})
export class MemberDetailsComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.setPhotoGalleryOptions();
    this.loadMemberData();
  }

  setPhotoGalleryOptions() {
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  getImages(): NgxGalleryImage[] {
    let imageUrls = [];
    for (let photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }

    return imageUrls;
  }

  loadMemberData() {
    this.memberService
      .getMember(this.activatedRouter.snapshot.paramMap.get("username"))
      .subscribe((res) => {
        this.member = res;
        this.galleryImages = this.getImages();
      });
  }
}
