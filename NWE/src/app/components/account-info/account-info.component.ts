import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
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

  filteredString: string = '';

  $customers: Observable<Customer[]>;

  selectedCustomer: Customer = {customerName: '', accounts: []};

  //----------New Customer / On-Call Account Input----------//

  noteArray: string[] = []

  customerForm = this.fb.group({
    customerName: ['']
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
    description: ['N/A'],

    price: [''],
    minimumPerService: [''],
    frequencyByWeeks: [''],

    perServiceCost: ['N/A'],
    monthlyCost: [''],

    extraBoxCostHauler: [''],
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

    this.ocaService.addOnCallAccount(account, this.selectedCustomer.customerName);
    this.containerForm.reset()
    this.accountForm.reset()
    this.addressForm.reset()
  }

  onAddNewCustomer() {
    const newCustomer = <Customer>{
      ...this.customerForm.value
    }

    this.cs.addCustomer(newCustomer)
    this.customerForm.reset()
  }

  resetSelectedCustomer() {
    this.selectedCustomer = {customerName: '', accounts: []}
  }

  resetFilteredString() {
    this.filteredString = ''
  }

  calcExtraCustomer(extraBoxesCustomer: string) {
    return this.extraBoxesCustomer * +extraBoxesCustomer
  }

  calcExtraHauler(extraBoxCostHauler: string) {
    return this.extraBoxesHauler * +extraBoxCostHauler
  }

  onDeleteAccount(element: ElementRef) {
    element.nativeElement.disabled = false
    element.nativeElement.visible = true
  }

  onConfirmDeleteAccount(account: OnCallAccount) {

    this.ocaService.removeOnCallAccount(account, this.selectedCustomer.customerName)
  }
}

// Angular ngIf Directive and the Elvis Operator (Angular University)

