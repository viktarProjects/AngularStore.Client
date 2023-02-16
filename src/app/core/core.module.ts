import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "./layout/nav-bar/nav-bar.component";
import {RouterModule} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import { SectionHeaderComponent } from './layout/section-header/section-header.component';
import {BreadcrumbModule} from "xng-breadcrumb";
import {SharedModule} from "../shared/shared.module";
import { FooterComponent } from './layout/footer/footer.component';
import {ContactUsComponent} from "../components/contact-us/contact-us.component";


@NgModule({
  declarations: [NavBarComponent,SectionHeaderComponent, FooterComponent,ContactUsComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [NavBarComponent, SectionHeaderComponent,FooterComponent,ContactUsComponent]
})
export class CoreModule {
}
