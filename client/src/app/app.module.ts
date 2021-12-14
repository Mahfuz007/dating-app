import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { BsDropdownConfig } from "ngx-bootstrap/dropdown";

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    BsDropdownConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
