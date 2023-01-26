import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {TestErrorComponent} from "./core/test-error/test-error.component";
import {ServerErrorComponent} from "./core/test-error/server-error/server-error.component";
import {NotFoundComponent} from "./core/test-error/not-found/not-found.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes : Routes = [
  {path:'',component: HomeComponent,data : {breadcrumb:'Home'}},
  {path:'test-error',component: TestErrorComponent, data : {breadcrumb:'Test Errors'}},
  {path:'server-error',component: ServerErrorComponent,data : {breadcrumb:'Server Error'}},
  {path:'not-found',component: NotFoundComponent, data : {breadcrumb:'Not Found'}},
  {path:'catalog',loadChildren: () => import('./components/shop/shop.module').then(x => x.ShopModule),
    data : {breadcrumb:'Catalog'}},
  {path:'basket',loadChildren: () => import('./components/basket/basket.module').then(x => x.BasketModule),
    data : {breadcrumb:'Basket'}},
  {path:'checkout',canActivate:[AuthGuard],loadChildren: () => import('./components/checkout/checkout.module').then(x => x.CheckoutModule),
    data : {breadcrumb:'Checkout'}},
  {path:'account',loadChildren: () => import('./account/account.module').then(x => x.AccountModule),
    data : {breadcrumb:{skip:true}}},
  {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
