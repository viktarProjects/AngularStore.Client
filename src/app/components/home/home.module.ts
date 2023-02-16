import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {SharedModule} from "../../shared/shared.module";
import { NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import '@angular/localize/init';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        NgbCarouselModule,
        FormsModule,
        RouterLink
    ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule {

}
