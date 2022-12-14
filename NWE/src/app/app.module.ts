import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountInfoComponent} from './components/account-info/account-info.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {HomePageComponent} from './components/home-page/home-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {FlexModule} from "@angular/flex-layout";
import {AutofocusDirective} from './directives/autofocus.directive';
import {NgxMaskModule} from "ngx-mask";
import {BillFixerComponent} from './components/bill-fixer/bill-fixer.component';
import {HaulerContactComponent} from './components/hauler-contact/hauler-contact.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {FilterCustomerPipe} from './pipes/filterCustomer.pipe';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {
  OnCallAccountDialogComponent
} from './components/account-info/on-call-account-dialog/on-call-account-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LowercaseDirective} from './directives/lowercase.directive';
import {MatDividerModule} from "@angular/material/divider";
import {
  GlobalConfirmationDialogComponent
} from './components/global-confirmation-dialog/global-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountInfoComponent,
    HomePageComponent,
    AutofocusDirective,
    BillFixerComponent,
    HaulerContactComponent,
    FilterCustomerPipe,
    OnCallAccountDialogComponent,
    LowercaseDirective,
    GlobalConfirmationDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexModule,
    MatDialogModule,
    MatDividerModule,
    NgxMaskModule.forRoot(),


  ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}, DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
