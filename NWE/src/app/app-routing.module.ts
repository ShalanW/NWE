import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountInfoComponent} from "./components/account-info/account-info.component";
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  {path: "medicalInfo", component: AccountInfoComponent},
  {path: "home", component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
