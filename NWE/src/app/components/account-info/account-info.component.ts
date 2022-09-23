import {Component, OnInit} from '@angular/core';
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
    description: [''],

    price: [''],
    minimumPerService: [''],
    frequencyByWeeks: [''],

    perServiceCost: [''],
    monthlyCost: [''],

    extraBoxCostHauler: [''],
    extraBoxCostCustomer: [''],

  })

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

    this.ocaService.addHaulerContact(account, this.selectedCustomer.customerName);
    this.containerForm.reset()
    this.accountForm.reset()
    this.addressForm.reset()
  }

  onAddNewCustomer() {
    const newCustomer = <Customer>{
      ...this.customerForm.value
    }

    this.cs.addCustomer(newCustomer)
  }

  resetSelectedCustomer() {
    this.selectedCustomer = {customerName: '', accounts: []}
  }

  resetFilteredString() {
    this.filteredString = ''
  }
}

// Angular ngIf Directive and the Elvis Operator (Angular University)

