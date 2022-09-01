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

  //----------Field Declarations----------//

  baseAmounts: { amount: number, type: string, frequency: number, subtotal: number }[] = [];
  overageAmounts: { amount: number, type: string, frequency: number, subtotal: number }[] = [];
  taxAmounts: { amount: number, type: string, calculatedPercentage: number, subtotal: number }[] = [];

  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'},
    {value: 'tax', viewValue: 'Tax'},
    {value: 'admin', viewValue: 'Admin Fee'},
    {value: 'other', viewValue: 'Other'},
    {value: 'late', viewValue: 'Late Fee'},
  ];

  amount: any | null = 0;
  amtType: string = 'base';
  frequency: number = 1;
  subtotal: number = 0;

  fuelAmount: number = 0;
  fuelPercentage: number = 0;

  envAmount: number = 0;
  envPercentage: number = 0;

  fuelEnvCombinedAmount: number = 0;

  rcrAmount: number = 0;
  rcrPercentage: number = 0;

  franchiseAmount: number = 0;
  franchisePercentage: number = 0;

  taxAmount: number = 0;
  taxOverridePercent: number = 0;


  constructor(private fb: FormBuilder) {
  }

  //----------Getters----------//

  get fuelAmountValue() {
    return this.fuelAmount
  }

  get fuelPercentageValue() {
    return this.fuelPercentage
  }

  get envAmountValue() {
    return this.envAmount;
  }

  get envPercentageValue() {
    return this.envPercentage;
  }

  get combinedFuelEnvValue() {
    return this.fuelEnvCombinedAmount
  }

  get rcrAmountValue() {
    return this.rcrAmount;
  }

  get rcrPercentageValue() {
    return this.rcrPercentage;
  }

  get franchiseAmountValue() {
    return this.franchiseAmount;
  }

  get franchisePercentageValue() {
    return this.franchisePercentage;
  }


  ngOnInit(): void {
  }

  //----------Base and Overage Amount Calculations----------//


  calcSubtotal = () => {
    this.subtotal = this.amount * this.frequency

    if (!this.amount || !this.frequency) {
      this.subtotal = 0
    }

  }

  addNewBaseOverageAmount() {
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

    this.clearBaseOverageAmountForm()
  }

  deleteNewBaseOverageAmount(i: number, type: string) {
    if (type === 'base') {
      this.baseAmounts.splice(i, 1)
    }
    if (type === 'overage') {
      this.overageAmounts.splice(i, 1)
    }

  }

  clearBaseOverageAmountForm() {
    this.amount = 0;
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

  calcFeeBaseTotal = () => {
    return this.calcOverageAmounts() + this.calcBaseAmounts()
  }


  //----------Fuel Calculations----------//

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

  //----------ENV Calculations----------//

  calcEnvPercentage = () => {
    return (this.envAmountValue / this.calcFeeBaseTotal()) * 100
  }

  calcEnvAmount = () => {

    if (this.envPercentageValue) {
      return (this.calcFeeBaseTotal() * this.envPercentageValue) / 100
    } else {
      return this.calcFeeBaseTotal() * this.calcEnvPercentage() / 100
    }
  }

  //----------Combined Fuel & ENV Calculations----------//


  calcSplitFuel = () => {
    this.fuelAmount = this.combinedFuelEnvValue - this.calcEnvAmount()
  }

  calcSplitEnv = () => {
    this.envAmount = this.combinedFuelEnvValue - this.calcFuelAmount()
  }

  combinedCalc = () => {
    if (this.fuelPercentageValue > 0 && this.envPercentageValue > 0) {
      alert('Please enter only the Fuel OR the ENV override %')
    } else if (!this.fuelPercentageValue && !this.envPercentageValue) {
      alert('Please enter the Fuel OR the ENV override % 1')
    } else if (this.fuelPercentageValue < 0 || this.envPercentageValue < 0) {
      alert('Please enter the Fuel OR the ENV override % 2')
    } else if (this.fuelPercentageValue) {
      this.calcSplitEnv();
      this.calcSplitFuel();
    } else if (this.envPercentageValue) {
      this.calcSplitFuel();
      this.calcSplitEnv();
    }
  }

  //----------RCR Calculations----------//

  calcRcrPercentage = () => {
    return (this.rcrAmountValue / this.calcFeeBaseTotal()) * 100
  }

  calcRcrAmount = () => {

    if (this.rcrPercentageValue) {
      return (this.calcFeeBaseTotal() * this.rcrPercentageValue) / 100
    } else {
      return this.calcFeeBaseTotal() * this.calcRcrPercentage() / 100
    }
  }

  //----------Franchise Calculations----------//

  calcFranchisePercentage = () => {
    return (this.franchiseAmountValue / this.calcFeeBaseTotal()) * 100
  }

  calcFranchiseAmount = () => {

    if (this.franchisePercentageValue) {
      return (this.calcFeeBaseTotal() * this.franchisePercentageValue) / 100
    } else {
      return this.calcFeeBaseTotal() * this.calcFranchisePercentage() / 100
    }
  }

  //----------FeesTotals----------//

  calcFeesTotal = () => {
    return this.calcFuelAmount() + this.calcEnvAmount() + this.calcRcrAmount() + this.calcFranchiseAmount()
  }

  //----------Final Calculations----------//

  calcTotalBill = () => {
    return this.calcFeeBaseTotal() + this.calcFuelAmount() + this.calcEnvAmount() + this.calcRcrAmount() + this.calcFranchiseAmount()
  }


}
