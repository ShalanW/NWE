import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";

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

  baseAmountsForm = this.fb.group({
    amount: [''],
    type: [''],
    frequency: [''],
    subtotal: ['']
  })

  amountTypes: AmountTypes[] = [
    {value: 'base', viewValue: 'Base'},
    {value: 'overage', viewValue: 'Overage'}
  ];


  mainForm = this.fb.group({
    baseAmounts: [[], {validators: [Validators.required]}]
  })


  constructor(private fb: NonNullableFormBuilder) {
  }


  ngOnInit(): void {

  }


  calculateForm() {
    console.log(this.getAmount())
  }

  getAmount() {
    return this.baseAmountsForm.get('amount').value
  }

  getFrequency() {

  }
}
