import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BsDropdownConfig } from "ngx-bootstrap/dropdown";
import { PaginationConfig, PaginationModule } from "ngx-bootstrap/pagination";
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { SharedModule } from "./_modules/shared.module";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { LoadingInterceptor } from "./_interceptors/loading.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { PhotoEditComponent } from "./members/photo-edit/photo-edit.component";
import { ImageUploaderModule } from "ngx-image-uploader";
import { InputFieldComponent } from "./_forms/input-field/input-field.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditComponent,
    InputFieldComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    ImageUploaderModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    BsDropdownConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: PaginationConfig,
      useValue: {
        boundaryLinks: true,
        firstText: "First",
        previousText: "&lsaquo;",
        nextText: "&rsaquo;",
        lastText: "Last",
        maxSize: 1,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
