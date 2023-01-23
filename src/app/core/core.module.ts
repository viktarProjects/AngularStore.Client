import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RouterModule} from "@angular/router";
import {TestErrorComponent} from './test-error/test-error.component';
import {NotFoundComponent} from './test-error/not-found/not-found.component';
import {ServerErrorComponent} from './test-error/server-error/server-error.component';
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [NavBarComponent]
})
export class CoreModule {
}
