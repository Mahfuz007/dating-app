import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AppRoutingModule } from "../app-routing.module";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    }),
  ],
  exports: [BsDropdownModule, AppRoutingModule, ToastrModule],
})
export class SharedModule {}
