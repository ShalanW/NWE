import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";

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

  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'}
  ];

  amount = 0;
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

  addNewBaseAmount() {
    const newBaseAmount = {
      amount: this.amount,
      type: this.amtType,
      frequency: this.frequency,
      subtotal: this.subtotal
    }
    this.baseAmounts.push(newBaseAmount)
  }

  clearBaseForm() {
    this.amount = 0;
    this.frequency = 1;
    this.subtotal = 0;
    this.amtType = 'base';
  }
}
