import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {SharedModule} from "../../shared/shared.module";
import {OrdersComponent} from "./orders.component";
import {OrdersRoutingModule} from "./orders-routing.module";



@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
