import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ServiceAddress} from "../../model/general/service-address";
import {OnCallAccountService} from "../../services/on-call-account.service";
import {OnCallAccount} from "../../model/stericycle/OnCallAccount";
import {Container} from "../../model/stericycle/container";
import {Customer} from "../../model/general/customer";
import {CustomerService} from "../../services/customer.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {


  today = new Date()

  newAmount: string = ''

  filteredString: string = '';

  $customers: Observable<Customer[]>;

  selectedCustomer: Customer = {
    customerName: '',
    haulerApiDate: undefined,
    customerApiDate: undefined,
    customerApiRate: '',
    accounts: {'': {} as OnCallAccount}
  }
  ;

  //----------New Customer / On-Call Account Input----------//

  noteArray: string[] = []

  customerForm = this.fb.group({
    customerName: [''],
    haulerApiDate: [new Date()],
    customerApiDate: [new Date()],
    customerApiRate: ['']
  })

  accountForm = this.fb.group({

    type: [''],

    address: [{} as ServiceAddress],

    accountNumber: [''],
    siteNumber: [''],
    container: [{}],

  })

  addressForm = this.fb.group({
    streetAddress: [''],
    city: [''],
    state: [''],
    zip: [''],
  })

  containerForm = this.fb.group({

    type: [''],

    count: [''],
    size: [''],
    unit: [''],

    price: [''],
    minimumPerService: [''],
    frequencyByWeeks: [''],

    monthlyCost: [''],

    extraBoxCostHauler: [''],
    extraBoxCostCustomerOriginal: [''],
    extraBoxCostCustomer: [''],

  })
  extraBoxesCustomer: number = 0;
  extraBoxesHauler: number = 0;
  showConfirmButtons: boolean = false;


  constructor(private fb: FormBuilder, private ocaService: OnCallAccountService, private cs: CustomerService) {
    this.$customers = this.cs.loadCustomers();
  }

  displayFn(customer: Customer): string {
    return customer && customer.customerName ? customer.customerName : ''
  };

  ngOnInit(): void {
  }

  onAddNewAccount() {
    const account = <OnCallAccount>{
      ...this.accountForm.value,
      address: this.addressForm.value as ServiceAddress,
      container: this.containerForm.value as Container,
      notes: this.noteArray
    }

    this.ocaService.addOnCallAccount(account, this.selectedCustomer.customerName, this.selectedCustomer);
    this.containerForm.reset()
    this.accountForm.reset()
    this.addressForm.reset()
  }

  onAddNewCustomer() {


    const newCustomer = <Customer>{
      ...this.customerForm.value
    }

    newCustomer.haulerApiDate = new Date(this.customerForm.value.haulerApiDate?.getFullYear() ?? 2000, this.customerForm?.value.haulerApiDate?.getMonth() ?? 0, this.customerForm.value.haulerApiDate?.getDate() ?? 1)
    newCustomer.customerApiDate = new Date(this.customerForm.value.customerApiDate?.getFullYear() ?? 2000, this.customerForm?.value.customerApiDate?.getMonth() ?? 0, this.customerForm.value.customerApiDate?.getDate() ?? 1)

    this.cs.addCustomer(newCustomer)
    this.customerForm.reset()
  }

  resetSelectedCustomer() {
    this.selectedCustomer = {customerName: '', accounts: {'': {} as OnCallAccount}}
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

  onConfirmDeleteAccount(account: OnCallAccount) {

    this.ocaService.removeOnCallAccount(account, this.selectedCustomer.customerName)
  }

  // compareDates(date: any) {
  //
  //   if (date && date <= this.today) {
  //     return true
  //   } else return false
  // }

  // this was cool - use it again

  onUpdateCustomer(selectedCustomer: Customer, date: string) {
    const newDate = new Date(date)
    this.cs.updateCustomer(selectedCustomer, newDate)
    this.customerForm.reset()
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


}

// Angular ngIf Directive and the Elvis Operator (Angular University)
