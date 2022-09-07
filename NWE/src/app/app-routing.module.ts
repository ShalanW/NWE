import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountInfoComponent} from "./components/account-info/account-info.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {BillFixerComponent} from "./components/bill-fixer/bill-fixer.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: "home", component: HomePageComponent},
  {path: "medicalInfo", component: AccountInfoComponent},
  {path: "bill-fixer", component: BillFixerComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
