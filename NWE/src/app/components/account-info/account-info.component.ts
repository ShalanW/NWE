import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ServiceAddress} from "../../model/general/service-address";
import {OnCallAccountService} from "../../services/on-call-account.service";
import {OnCallAccount} from "../../model/stericycle/OnCallAccount";
import {Container} from "../../model/stericycle/container";
import {Customer} from "../../model/general/customer";
import {CustomerService} from "../../services/customer.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {OnCallAccountDialogComponent} from "./on-call-account-dialog/on-call-account-dialog.component";


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  newCustomerStartDate: string = ''

  newHaulerStartDate: string = ''

  filteredString: string = '';

  $customers: Observable<Customer[]>;
  $selectedCustomer: Observable<Customer[]> = new Observable<Customer[]>()

  selectedCustomer: Customer = {
    customerName: '',
    haulerApiDate: undefined,
    customerApiDate: undefined,
    customerApiRate: '',
    accounts: []
  }

  //----------New Customer / On-Call Account Input----------//

  newCustomer!: Customer

  noteArray: string[] = []

  extraBoxesCustomer: number = 0;
  extraBoxesHauler: number = 0;
  showConfirmButtons: boolean = false;


  constructor(private fb: FormBuilder,
              private ocaService: OnCallAccountService,
              private cs: CustomerService,
              public datePipe: DatePipe,
              public dialog: MatDialog) {
    this.$customers = this.cs.loadCustomers();

  }


  ngOnInit(): void {

  }

  openNewCustomerDialog() {
    const dialogRef = this.dialog.open(OnCallAccountDialogComponent, {
      data: {dialogType: 'New Customer'}
    })

    dialogRef.afterClosed().subscribe(customerForm => {

      if (customerForm) {
        this.onAddNewCustomer(customerForm.value)
      }

    })
  }

  openNewAccountDialog() {
    const dialogRef = this.dialog.open(OnCallAccountDialogComponent, {
      data: {dialogType: "New Account", customer: this.selectedCustomer}
    })

    dialogRef.afterClosed().subscribe(data => {

      if (data) {
        this.onAddNewAccount(data)
      }
    })
  }

  openEditAccountDialog(oldAccount: OnCallAccount) {
    const dialogRef = this.dialog.open(OnCallAccountDialogComponent, {
      data: {dialogType: "Edit Account", account: oldAccount}
    })

    dialogRef.afterClosed().subscribe(newAccount => {
      console.log(newAccount)
      if (newAccount) {
        this.onEditAccount(newAccount, this.selectedCustomer, oldAccount)
      }
    })
  }

  displayFn(customer: Customer): string {
    return customer && customer.customerName ? customer.customerName : ''
  };

  runOtherStuff() {

    if (this.filteredString === '') {
      this.onReset()
    }

  }

  runStuff() {
    this.$selectedCustomer = this.cs.loadSelectedCustomer(this.selectedCustomer.customerName, this.selectedCustomer)
    this.newCustomerStartDate = this.datePipe.transform(this.selectedCustomer?.customerApiDate, 'yyyy-MM-dd') || ''
    this.newHaulerStartDate = this.datePipe.transform(this.selectedCustomer?.haulerApiDate, 'yyyy-MM-dd') || ''
  }

  onAddNewAccount(data: any) {

    console.log(data)

    const account = <OnCallAccount>{
      ...data?.accountForm?.value,
      address: data?.addressForm?.value as ServiceAddress,
      container: data?.containerForm?.value as Container,
      notes: []
    }

    this.ocaService.addOnCallAccount(account, this.selectedCustomer.customerName, this.selectedCustomer);
  }

  onConfirmDeleteAccount(account: OnCallAccount, selectedCustomer: Customer) {
    this.ocaService.removeOnCallAccount(account, selectedCustomer.customerName)
  }

  onAddNewCustomer(newCustomerForm: Customer) {

    const newCustomer = <Customer>{
      ...newCustomerForm
    }

    newCustomer.haulerApiDate = new Date(newCustomerForm.haulerApiDate?.getFullYear() ?? 2000, newCustomerForm.haulerApiDate?.getMonth() ?? 0, newCustomerForm.haulerApiDate?.getDate() ?? 1)
    newCustomer.customerApiDate = new Date(newCustomerForm.customerApiDate?.getFullYear() ?? 2000, newCustomerForm.customerApiDate?.getMonth() ?? 0, newCustomerForm.customerApiDate?.getDate() ?? 1)

    this.cs.addCustomer(newCustomer)

  }

  resetSelectedCustomer() {
    this.selectedCustomer = {
      customerName: '',
      haulerApiDate: undefined,
      customerApiDate: undefined,
      customerApiRate: '',
      accounts: []
    }
  }

  resetFilteredString() {
    this.filteredString = ''
  }

  calcExtraCustomer(extraBoxesCustomer: any) {
    return +this.extraBoxesCustomer * +extraBoxesCustomer
  }

  calcExtraHauler(extraBoxCostHauler: any) {
    return this.extraBoxesHauler * +extraBoxCostHauler
  }

  onDeleteAccount(element: ElementRef) {
    element.nativeElement.disabled = false
    element.nativeElement.visible = true
  }


  // compareDates(date: any) {
  //
  //   if (date && date <= this.today) {
  //     return true
  //   } else return false
  // }

  // this was cool - use it again

  onUpdateCustomer(selectedCustomer: Customer, customerStartDate: string | '', haulerStartDate: string | '') {
    this.cs.updateCustomer(selectedCustomer, customerStartDate, haulerStartDate)
  }

  addOneYear(selectedCustomer: Customer) {
    const oldYear: any = selectedCustomer.customerApiDate ? selectedCustomer.haulerApiDate?.getFullYear() : undefined
    const newYear = oldYear ? oldYear + 1 : undefined
    return selectedCustomer.customerApiDate?.setFullYear(newYear)
  }

  addTwoYears(selectedCustomer: Customer) {
    const oldYear: any = selectedCustomer.customerApiDate ? selectedCustomer.haulerApiDate?.getFullYear() : undefined
    const newYear = oldYear ? oldYear + 2 : undefined
    return selectedCustomer.customerApiDate?.setFullYear(newYear)
  }

  addOneApi(cost: any, apiRate: any): number {
    return +((+cost * (+apiRate / 100)) + +cost)
  }

  addTwoApis(cost: any, apiRate: any): number {

    const firstApi = +((+cost * (+apiRate / 100)) + +cost)

    return (+(+firstApi * (+apiRate / 100)) + +firstApi)
  }

  onTest() {

  }

  onReset() {
    this.resetFilteredString();
    this.resetSelectedCustomer();
    this.runStuff();
  }

  runHelper() {
    this.cs.updateCustomerHelper(this.selectedCustomer)
  }

  onDeleteCustomer(selectedCustomer: Customer) {
    this.cs.deleteCustomer(selectedCustomer)
    this.onReset()
  }


  onEditAccount(data: any, customer: Customer, oldAccount: OnCallAccount) {

    const newAccount = <OnCallAccount>{
      ...data?.accountForm?.value,
      address: data?.addressForm?.value as ServiceAddress,
      container: data?.containerForm?.value as Container,
      notes: []
    }
    this.ocaService.editOnCallAccount(newAccount, customer, oldAccount)
  }
}

// Angular ngIf Directive and the Elvis Operator (Angular University)
