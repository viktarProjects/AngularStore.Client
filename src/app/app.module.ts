import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./components/home/home.module";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {CredentialsInterceptor} from "./core/interceptors/credentials.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    HomeModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
