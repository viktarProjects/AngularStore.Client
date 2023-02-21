import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {ContactUsComponent} from "./components/contact-us/contact-us.component";

const routes : Routes = [
  {path:'',component: HomeComponent, pathMatch:"full",data : {breadcrumb:'Home'}},
  {path:'home',component: HomeComponent,data : {breadcrumb:'Home'}},
  {path:'contact-us',component: ContactUsComponent,data : {breadcrumb:'Contact us'}},
  {path:'catalog',loadChildren: () => import('./components/shop/shop.module').then(x => x.ShopModule),
    data : {breadcrumb:'Catalog'}},
  {path:'basket',loadChildren: () => import('./components/basket/basket.module').then(x => x.BasketModule),
    data : {breadcrumb:'Basket'}},
  {path:'checkout',canActivate:[AuthGuard],loadChildren: () => import('./components/checkout/checkout.module').then(x => x.CheckoutModule),
    data : {breadcrumb:'Checkout'}},
  {path:'orders',canActivate:[AuthGuard],loadChildren: () => import('./account/orders/orders.module').then(x => x.OrdersModule),
    data : {breadcrumb:'My orders'}},
  {path:'account',loadChildren: () => import('./account/account.module').then(x => x.AccountModule),
    data : {breadcrumb:{skip:true}}},
  {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
