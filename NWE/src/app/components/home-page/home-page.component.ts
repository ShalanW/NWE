import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

interface AmountTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  baseAmounts: { amount: number, type: string, frequency: number, subtotal: number }[] = [];
  overageAmounts: { amount: number, type: string, frequency: number, subtotal: number }[] = [];

  fuelAmount: number = 0;
  fuelPercentage: number = 0;

  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'},
    {value: 'fuel', viewValue: 'Fuel'},
    {value: 'env', viewValue: 'ENV'},
    {value: 'rcr', viewValue: 'RCR'},
    {value: 'franchise', viewValue: 'Franchise'},
    {value: 'tax', viewValue: 'Tax'},
    {value: 'admin', viewValue: 'Admin Fee'},
    {value: 'other', viewValue: 'Other'},
    {value: 'late', viewValue: 'Late Fee'},
  ];

  amount: any | null = 0;
  amtType = 'base';
  frequency = 1;
  subtotal = 0;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  calcSubtotal() {
    this.subtotal = this.amount * this.frequency

    if (!this.amount || !this.frequency) {
      this.subtotal = 0
    }

  }

  addNewAmount() {
    const newAmount = {
      amount: +this.amount,
      type: this.amtType,
      frequency: +this.frequency,
      subtotal: +this.subtotal
    }
    if (newAmount.type === 'base') {
      this.baseAmounts.push(newAmount)
    }
    if (newAmount.type === 'overage') {
      this.overageAmounts.push(newAmount)
    }

    this.clearBaseForm()
  }

  clearBaseForm() {
    this.amount = null;
    this.frequency = 1;
    this.subtotal = 0;
    this.amtType = 'base';
  }

  calcBaseAmountsTotal() {
    return this.baseAmounts.reduce((acc, line) => acc + line.subtotal, 0)
  }

  calcOverageAmountsTotal() {
    return this.overageAmounts.reduce((acc, line) => acc + line.subtotal, 0)
  }

  deleteLine(i: number, type: string) {
    if (type === 'base') {
      this.baseAmounts.splice(i, 1)
    }
    if (type === 'overage') {
      this.overageAmounts.splice(i, 1)
    }

  }

  calcBillTotal() {
    return this.calcOverageAmountsTotal() + this.calcBaseAmountsTotal()
  }
}
