import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AccountRoutingModule} from "./account-routing.module";
import {SharedModule} from "../shared/shared.module";
import { OrdersComponent } from './orders/orders.component';
import { MyAccountComponent } from './my-account/my-account.component';
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    NgxMatIntlTelInputComponent,
    NgxIntlTelInputModule
  ]
})
export class AccountModule { }
