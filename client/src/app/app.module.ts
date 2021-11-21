import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from "./nav/nav.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BsDropdownConfig, BsDropdownModule } from "ngx-bootstrap/dropdown";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { ListsComponent } from "./lists/lists.component";
import { AppRoutingModule } from "./app-routing.module";
import { MessagesComponent } from "./messages/messages.component";

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [BsDropdownConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
