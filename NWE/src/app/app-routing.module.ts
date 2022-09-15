import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountInfoComponent} from "./components/account-info/account-info.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {BillFixerComponent} from "./components/bill-fixer/bill-fixer.component";
import {HaulerContactComponent} from "./components/hauler-contact/hauler-contact.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: "home", component: HomePageComponent, title: "Home"},
  {path: "medicalInfo", component: AccountInfoComponent, title: "Medical Info"},
  {path: "hauler-contact", component: HaulerContactComponent, title: "Hauler Contacts"},
  {path: "bill-fixer", component: BillFixerComponent, title: "Bill Fixer"},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
