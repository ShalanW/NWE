import {Pipe, PipeTransform} from '@angular/core';
import {Customer} from "../model/general/customer";

@Pipe({
  name: 'filterCustomer'
})
export class FilterCustomerPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if (!value || filterString === '') {
      return value;
    }

    const customers: any = []
    value.map((customer: Customer) => {
      const lowerString = filterString.toLowerCase()
      const lowerCustomer = customer.customerName.toLowerCase()
      console.log()
      if (lowerCustomer.includes(lowerString)) {
        customers.push(customer)
      }

      if (customer.accounts) {
        for (const account of customer.accounts) {
          if (account.accountNumber.includes(filterString)) {
            customers.push(customer)
          }
        }
      }

    })
    return customers;

  }

}

// filteredString: string = '';


//
// <div>
//   <mat-form-field class="customer" fxFill>
// <mat-label>Customer</mat-label>
// <input [(ngModel)]="filteredString" autocomplete="off" matInput type="text">
// </mat-form-field>
// <div *ngFor="let customer of $customers | async | filterCustomer:filteredString">
//   {{customer.customerName }} {{'hey'}}
// </div>
// </div>
