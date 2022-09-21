import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ServiceAddress} from "../../model/general/service-address";
import {OnCallAccountService} from "../../services/on-call-account.service";
import {OnCallAccount} from "../../model/stericycle/OnCallAccount";
import {Container} from "../../model/stericycle/container";


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  noteArray: string[] = []

  customerForm = this.fb.group({
    customer: ['']
  })

  accountForm = this.fb.group({

    type: [''],

    address: [{} as ServiceAddress],

    accountNumber: [''],
    siteNumber: [''],
    container: [{}],
    customer: [''],

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

  constructor(private fb: FormBuilder, private ocaService: OnCallAccountService) {
  }

  ngOnInit(): void {
  }

  onAddNewAccount() {
    const account = <OnCallAccount>{
      ...this.accountForm.value,
      address: this.addressForm.value as ServiceAddress,
      container: this.containerForm.value as Container,
      notes: this.noteArray
    }

    this.ocaService.addHaulerContact(account);
    this.containerForm.reset()
    this.accountForm.reset()
    this.addressForm.reset()
  }
}


// Angular ngIf Directive and the Elvis Operator (Angular University)

