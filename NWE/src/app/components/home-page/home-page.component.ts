import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";

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

  billFixerForm = this.fb.group({
    baseAmounts: this.fb.array([])
  })

  baseAmountsForm = this.fb.group({
    amount: [null],
    type: [''],
    frequency: [1],
    subtotal: [0],
  })

  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'}
  ];

  constructor(private fb: FormBuilder) {
  }

  get baseAmounts() {
    return this.billFixerForm.controls["baseAmounts"] as FormArray;
  }

  ngOnInit(): void {
  }

  calcSubtotal() {
    if (this.baseAmountsForm.value.amount && this.baseAmountsForm.value.frequency) {

      this.baseAmountsForm.patchValue({
        subtotal: this.baseAmountsForm.value.amount * this.baseAmountsForm.value.frequency
      })
    }

    if (!this.baseAmountsForm.value.amount || !this.baseAmountsForm.value.frequency) {
      this.baseAmountsForm.patchValue({
        subtotal: 0
      })
    }

  }

  addNewBaseAmount() {
    this.baseAmounts.push(this.baseAmountsForm)

  }
}
