import {Component, OnInit} from '@angular/core';
import {AmountTypes} from "../../model/general/amount-types";
import {LineItem} from "../../model/general/line-item";


@Component({
  selector: 'app-bill-fixer',
  templateUrl: './bill-fixer.component.html',
  styleUrls: ['./bill-fixer.component.scss']
})
export class BillFixerComponent implements OnInit {

  //----------Field Declarations----------//

  billAmounts: LineItem[] = [];

  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'},
  ];

  amount: any | null = 0;
  amtType: string = 'base';
  frequency: number = 1;
  subtotal: number = 0;

  fuelAmount: number = 0;
  fuelPercentageOverride: number = 0;

  envAmount: number = 0;
  envPercentageOverride: number = 0;

  fuelEnvCombinedAmount: number = 0;

  rcrAmount: number = 0;
  rcrPercentageOverride: number = 0;

  franchiseAmount: number = 0;
  franchisePercentageOverride: number = 0;

  adminFee: number = 0;
  otherFee1: number = 0;
  otherFee2: number = 0;
  lateFee: number = 0;

  taxAmount: number = 0;
  taxAmountPercentageOverride: number = 0;

  taxAmount2: number = 0;
  taxAmountPercentage2Override: number = 0;

  taxAmount3: number = 0;
  taxAmountPercentage3Override: number = 0;

  taxAmount4: number = 0;
  taxAmountPercentage4Override: number = 0;

  constructor() {
  }

  //----------Getters----------//

  get fuelAmountValue() {
    return this.fuelAmount
  }

  get fuelPercentageValue() {
    return this.fuelPercentageOverride
  }

  get envAmountValue() {
    return this.envAmount;
  }

  get envPercentageValue() {
    return this.envPercentageOverride;
  }

  get combinedFuelEnvValue() {
    return this.fuelEnvCombinedAmount
  }

  get rcrAmountValue() {
    return this.rcrAmount;
  }

  get rcrPercentageValue() {
    return this.rcrPercentageOverride;
  }

  get franchiseAmountValue() {
    return this.franchiseAmount;
  }

  get franchisePercentageValue() {
    return this.franchisePercentageOverride;
  }

  get adminFeeValue() {
    return +this.adminFee
  }

  get otherFee1Value() {
    return +this.otherFee1
  }

  get otherFee2Value() {
    return +this.otherFee2
  }

  get lateFeeValue() {
    return +this.lateFee
  }

  get taxAmountValue() {
    return +this.taxAmount;
  }

  get taxAmountPercentageValue() {
    return +this.taxAmountPercentageOverride;
  }

  get taxAmount2Value() {
    return +this.taxAmount2;
  }

  get taxAmountPercentage2Value() {
    return +this.taxAmountPercentage2Override
  }

  get taxAmount3Value() {
    return this.taxAmount3;
  }

  get taxAmountPercentage3Value() {
    return +this.taxAmountPercentage3Override
  }

  get taxAmount4Value() {
    return this.taxAmount4;
  }

  get taxAmountPercentage4Value() {
    return +this.taxAmountPercentage4Override
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

  addNewBillAmount() {
    const newAmount = {
      amount: +this.amount,
      type: this.amtType,
      frequency: +this.frequency,
      subtotal: +this.subtotal
    }

    this.billAmounts.push(newAmount)

    this.clearBillAmountForm()
  }

  deleteBillAmount(i: number) {
    this.billAmounts.splice(i, 1)
  }

  clearBillAmountForm() {
    this.amount = 0;
    this.frequency = 1;
    this.subtotal = 0;
    this.amtType = 'base';
  }

  calcBaseAmounts() {
    const amounts = this.billAmounts.filter(amount => amount.type === 'base')
    return amounts.reduce((acc, line) => acc + line.subtotal, 0)
  }

  calcOverageAmounts = () => {
    const amounts = this.billAmounts.filter(amount => amount.type === 'overage')
    return amounts.reduce((acc, line) => acc + line.subtotal, 0)
  }

  calcFeeBaseTotal = () => {
    return +this.calcOverageAmounts() + +this.calcBaseAmounts()
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
    return (+this.envAmountValue / +this.calcFeeBaseTotal()) * 100
  }

  calcEnvAmount = () => {

    if (+this.envPercentageValue) {
      return (+this.calcFeeBaseTotal() * +this.envPercentageValue) / 100
    } else {
      return +this.calcFeeBaseTotal() * +this.calcEnvPercentage() / 100
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

  //----------OtherFeesTotals----------//

  calcAdminFeesTotal = () => {
    return +this.adminFeeValue
  }

  calcOther12FeesTotal = () => {
    return +this.otherFee1Value + +this.otherFee2Value
  }

  calculateLateFeesTotal = () => {
    return +this.lateFeeValue
  }

  calcOtherFeesTotal = () => {
    return +this.calcAdminFeesTotal() + +this.calcOther12FeesTotal()
  }

  //----------Tax Calculations----------//

  calcTaxBase = () => {
    return +this.calcFeeBaseTotal() + +this.calcFeesTotal() + +this.calcAdminFeesTotal() + +this.calcOther12FeesTotal()
  }

  calcTax1Percentage = () => {
    return (this.taxAmountValue / this.calcTaxBase()) * 100
  }
  calcTax1Amount = () => {

    if (this.taxAmountPercentageValue) {
      return (this.calcTaxBase() * this.taxAmountPercentageValue) / 100
    } else {
      return (this.calcTaxBase() * this.calcTax1Percentage()) / 100
    }
  }

  calcTax2Percentage = () => {
    return (this.taxAmount2Value / this.calcTaxBase()) * 100
  }
  calcTax2Amount = () => {

    if (this.taxAmountPercentage2Value) {
      return (this.calcTaxBase() * this.taxAmountPercentage2Value) / 100
    } else {
      return (this.calcTaxBase() * this.calcTax2Percentage()) / 100
    }
  }

  calcTax3Percentage = () => {
    return (this.taxAmount3Value / this.calcTaxBase()) * 100
  }
  calcTax3Amount = () => {

    if (this.taxAmountPercentage3Value) {
      return (this.calcTaxBase() * this.taxAmountPercentage3Value) / 100
    } else {
      return (this.calcTaxBase() * this.calcTax3Percentage()) / 100
    }
  }

  calcTax4Percentage = () => {
    return (this.taxAmount4Value / this.calcTaxBase()) * 100
  }
  calcTax4Amount = () => {

    if (this.taxAmountPercentage4Value) {
      return (this.calcTaxBase() * this.taxAmountPercentage4Value) / 100
    } else {
      return (this.calcTaxBase() * this.calcTax4Percentage()) / 100
    }
  }

  calcTaxTotal = () => {
    return +this.calcTax1Amount() + +this.calcTax2Amount() + +this.calcTax3Amount() + +this.calcTax4Amount()
  }

  //----------Final Calculations----------//

  calcTotalBill = () => {
    return +this.calcFeeBaseTotal() + +this.calcFeesTotal() + +this.calcTaxTotal() + +this.calcOtherFeesTotal() + +this.calculateLateFeesTotal()
  }

  calcHaulerOverages() {

    const fuel: number = this.fuelPercentageValue ? (this.calcOverageAmounts() * this.fuelPercentageValue) / 100 : (this.calcOverageAmounts() * this.calcFuelPercentage()) / 100
    const env: number = this.envPercentageValue ? (this.calcOverageAmounts() * this.envPercentageValue) / 100 : (this.calcOverageAmounts() * this.calcEnvPercentage()) / 100
    const rcr: number = this.rcrPercentageValue ? (this.calcOverageAmounts() * this.rcrPercentageValue) / 100 : (this.calcOverageAmounts() * this.calcRcrPercentage()) / 100
    const fran: number = this.franchisePercentageValue ? (this.calcOverageAmounts() * this.franchisePercentageValue) / 100 : (this.calcOverageAmounts() * this.calcFranchisePercentage()) / 100
    const calcFeesTotal = () => +fuel + +env + +rcr + +fran

    const calcTaxBase = () => +this.calcOverageAmounts() + +calcFeesTotal()
    const tax1: number = this.taxAmountPercentageValue ? (calcTaxBase() * this.taxAmountPercentageValue) / 100 : (calcTaxBase() * this.calcTax1Percentage()) / 100
    const tax2: number = this.taxAmountPercentage2Value ? (calcTaxBase() * this.taxAmountPercentage2Value) / 100 : (calcTaxBase() * this.calcTax2Percentage()) / 100
    const tax3: number = this.taxAmountPercentage3Value ? (calcTaxBase() * this.taxAmountPercentage3Value) / 100 : (calcTaxBase() * this.calcTax3Percentage()) / 100
    const tax4: number = this.taxAmountPercentage4Value ? (calcTaxBase() * this.taxAmountPercentage4Value) / 100 : (calcTaxBase() * this.calcTax4Percentage()) / 100

    return (+this.calcOverageAmounts() + (+fuel + +env + +rcr + +fran) + (+tax1 + +tax2 + +tax3 + +tax4))

  }

  calcCustomerOverages() {
    if (this.calcHaulerOverages() >= 100) {
      return +this.calcHaulerOverages() * 1.2
    } else if (this.calcHaulerOverages() < 100 && this.calcHaulerOverages() > 0) {
      return +this.calcHaulerOverages() + 20
    } else return null


  }
}
