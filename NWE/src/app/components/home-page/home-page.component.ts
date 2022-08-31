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


  // TAX 1
  // TAX 2
  // TAX 3
  // TAX 4

  baseAmounts: { amount: number, type: string, frequency: number, subtotal: number }[] = [];
  overageAmounts: { amount: number, type: string, frequency: number, subtotal: number }[] = [];

  fuelAmounts: { amount: number, percentage: number, type: string, frequency: number, subtotal: number }[] = [];


  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'},
    {value: 'tax', viewValue: 'Tax'},
    {value: 'admin', viewValue: 'Admin Fee'},
    {value: 'other', viewValue: 'Other'},
    {value: 'late', viewValue: 'Late Fee'},
  ];

  amount: any | null = 0;
  amtType = 'base';
  frequency = 1;
  subtotal = 0;

  fuelAmount: number = 0;
  fuelPercentage: number = 0;

  envAmount: number = 0;
  envPercentage: number = 0;

  rcrAmount: number = 0;
  rcrPercentage: number = 0;

  franchiseAmount: number = 0;
  franchisePercentage: number = 0;


  constructor(private fb: FormBuilder) {
  }

  //------------ GETTERS---------------//

  get fuelAmountValue() {
    return this.fuelAmount
  }

  get fuelPercentageValue() {
    return this.fuelPercentage
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

  calcBaseAmounts() {
    return this.baseAmounts.reduce((acc, line) => acc + line.subtotal, 0)
  }

  calcOverageAmounts = () => {
    return this.overageAmounts.reduce((acc, line) => acc + line.subtotal, 0)
  }

  //FUEL ----------------------------------

  deleteLine(i: number, type: string) {
    if (type === 'base') {
      this.baseAmounts.splice(i, 1)
    }
    if (type === 'overage') {
      this.overageAmounts.splice(i, 1)
    }

  }

  calcFeeBaseTotal = () => {
    return this.calcOverageAmounts() + this.calcBaseAmounts()
  }

  calcFuelPercentage = () => {
    return (this.fuelAmountValue / this.calcFeeBaseTotal()) * 100
  }

  calcFuelAmount = () => {
    if (this.fuelPercentageValue) {
      return (this.calcFeeBaseTotal() * this.fuelPercentageValue) / 100
    } else {
      return this.calcFeeBaseTotal() * this.calcFuelPercentage() / 100
    }
  };

  //ENV----------------------

  get envAmountValue() {
    return this.envAmount;
  }

  calcEnvAmount() {

    return (this.envAmountValue / this.calcFeeBaseTotal()) * 100;
  }

  calcRcrAmount() {

    return (this.rcrAmount / this.calcFeeBaseTotal()) * 100;
  }

  calcFranchiseAmount() {

    return (this.franchiseAmount / this.calcFeeBaseTotal()) * 100;
  }

  calcTotalBill() {
    return this.calcFeeBaseTotal() + this.calcFuelAmount() + this.calcEnvAmount() + this.calcRcrAmount()
  }
}
