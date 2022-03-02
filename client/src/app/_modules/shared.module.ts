import { MatFormFieldModule } from "@angular/material/form-field";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AppRoutingModule } from "../app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { TabsModule, TabsetConfig } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { MatInputModule } from "@angular/material";
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    MatFormFieldModule,
    TimeagoModule.forRoot()
  ],
  exports: [
    CommonModule,
    BsDropdownModule,
    AppRoutingModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    MatFormFieldModule,
    MatInputModule,
    TimeagoModule
  ],
  providers: [TabsetConfig],
})
export class SharedModule {}
