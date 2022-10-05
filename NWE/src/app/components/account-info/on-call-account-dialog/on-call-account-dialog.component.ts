import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OnCallAccountDialogData} from "../../../model/stericycle/on-call-account-dialog-data";
import {OnCallAccount} from "../../../model/stericycle/OnCallAccount";
import {DatePipe} from "@angular/common";
import {ServiceAddress} from "../../../model/general/service-address";

@Component({
  selector: 'app-on-call-account-dialog',
  templateUrl: './on-call-account-dialog.component.html',
  styleUrls: ['./on-call-account-dialog.component.scss']
})
export class OnCallAccountDialogComponent implements OnInit {

// NEW CUSTOMER
  customerForm = this.fb.group({
    customerName: [''],
    haulerApiDate: [new Date()],
    customerApiDate: [new Date()],
    customerApiRate: ['']
  })

// EDIT CUSTOMER
  newCustomerStartDate: any
  newHaulerStartDate: any
  newCustomerApiRate: any
  editCustomerDataObj: {} = {}


// NEW ACCOUNT
  addAccountDataObj: {} = {}

// EDIT ACCOUNT
  editAccount: OnCallAccount | undefined
  accountForm = this.fb.group({

    type: [this.data.account?.type],
    accountNumber: [this.data.account?.accountNumber],
    siteNumber: [this.data.account?.siteNumber],

  })
  addressForm = this.fb.group({

    streetAddress: [this.data.account?.address.streetAddress],
    city: [this.data.account?.address.city],
    state: [this.data.account?.address.state],
    zip: [this.data.account?.address.zip],

  })
  editAddressForm = this.fb.group({

    streetAddress: [this.data?.customer?.address?.streetAddress],
    city: [this.data?.customer?.address?.city],
    state: [this.data?.customer?.address?.state],
    zip: [this.data?.customer?.address?.zip],

  })
  containerForm = this.fb.group({

    type: [this.data.account?.container.type],

    count: [this.data.account?.container.count],
    size: [this.data.account?.container.size],
    unit: [this.data.account?.container.unit],

    price: [this.data.account?.container.price],
    minimumPerService: [this.data.account?.container.minimumPerService],
    frequencyByWeeks: [this.data.account?.container.frequencyByWeeks],

    monthlyCost: [this.data.account?.container.monthlyCost],

    extraBoxCostHauler: [this.data.account?.container.extraBoxCostHauler],
    extraBoxCostCustomerOriginal: [this.data.account?.container.extraBoxCostCustomerOriginal],
    extraBoxCostCustomer: [this.data.account?.container.extraBoxCostCustomer],

  })
  editAccountDataObj: {} = {}


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<OnCallAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OnCallAccountDialogData,
              public datePipe: DatePipe
  ) {
    this.editAccount = data.account

    this.newCustomerStartDate = this.datePipe.transform(data.customer?.customerApiDate, 'yyyy-MM-dd') || ''
    this.newHaulerStartDate = this.datePipe.transform(data.customer?.haulerApiDate, 'yyyy-MM-dd') || ''
    this.newCustomerApiRate = data.customer?.customerApiRate
  }

  ngOnInit(): void {
  }

  onUpdateCustomer() {
    this.editCustomerDataObj = {
      customerApiRate: this.newCustomerApiRate,
      customerApiDate: this.newCustomerStartDate,
      haulerApiDate: this.newHaulerStartDate,
      address: this.addressForm.value
    }

    this.dialogRef.close(this.editCustomerDataObj)
  }

  onClose() {
    this.dialogRef.close()
  }

  onAddAccount() {

    this.addAccountDataObj = {
      accountForm: this.accountForm,
      addressForm: this.addressForm,
      containerForm: this.containerForm
    }

    this.dialogRef.close(this.addAccountDataObj)

  }

  onEditAccount() {

    this.editAccountDataObj = {
      accountForm: this.accountForm,
      addressForm: this.addressForm,
      containerForm: this.containerForm
    }

    this.dialogRef.close(this.editAccountDataObj)
  }

  onCopyAddressFromCustomer(address: any) {
    this.addressForm = this.fb.group({

      streetAddress: [address.streetAddress],
      city: [address.city],
      state: [address.state],
      zip: [address.zip],

    })

  }
}
