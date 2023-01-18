import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";

const routes : Routes = [
  {path:'',component: HomeComponent},
  {path:'catalog',loadChildren: () => import('./shop/shop.module').then(x => x.ShopModule)},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
