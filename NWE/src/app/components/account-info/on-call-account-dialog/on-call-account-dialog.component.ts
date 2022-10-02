import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OnCallAccountDialogData} from "../../../model/stericycle/on-call-account-dialog-data";
import {ServiceAddress} from "../../../model/general/service-address";

@Component({
  selector: 'app-on-call-account-dialog',
  templateUrl: './on-call-account-dialog.component.html',
  styleUrls: ['./on-call-account-dialog.component.scss']
})
export class OnCallAccountDialogComponent implements OnInit {

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

  dataObj: {} = {}

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<OnCallAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OnCallAccountDialogData,
  ) {
  }

  ngOnInit(): void {
  }


  onClose() {
    this.dialogRef.close()
  }

  onAddAccount() {

    this.dataObj = {
      accountForm: this.accountForm,
      addressForm: this.addressForm,
      containerForm: this.containerForm
    }

    this.dialogRef.close(this.dataObj)

  }
}
