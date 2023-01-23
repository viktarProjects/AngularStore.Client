import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {TestErrorComponent} from "./core/test-error/test-error.component";
import {ServerErrorComponent} from "./core/test-error/server-error/server-error.component";
import {NotFoundComponent} from "./core/test-error/not-found/not-found.component";

const routes : Routes = [
  {path:'',component: HomeComponent},
  {path:'test-error',component: TestErrorComponent},
  {path:'server-error',component: ServerErrorComponent},
  {path:'not-found',component: NotFoundComponent},
  {path:'catalog',loadChildren: () => import('./components/shop/shop.module').then(x => x.ShopModule)},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
