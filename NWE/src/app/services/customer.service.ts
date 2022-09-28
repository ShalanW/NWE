import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Customer} from "../model/general/customer";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  collectionRef = this.db.collection('Customers');


  constructor(private db: AngularFirestore) {
  }

  loadCustomers(): Observable<Customer[]> {
    return this.collectionRef.snapshotChanges()
      .pipe(
        map(customers => {
          return customers.map(customer => {
            return <Customer>{
              id: customer.payload.doc.id,
              ...customer.payload.doc.data() as Customer,
              customerName: customer.payload.doc.id,
              haulerApiDate: customer.payload.doc?.get('haulerApiDate')?.toDate(),
              customerApiDate: customer.payload.doc?.get('customerApiDate')?.toDate(),
              customerApiRate: customer.payload.doc?.get('customerApiRate')

            }
          })
        })
      )

  }


  addCustomer(newCustomer: Partial<Customer>) {
    const id = newCustomer.customerName

    newCustomer = {
      haulerApiDate: newCustomer.haulerApiDate,
      customerApiDate: newCustomer.customerApiDate,
      customerApiRate: newCustomer.customerApiRate
    }

    this.collectionRef.doc(id).set(newCustomer, {merge: true})
  }

  updateCustomer(selectedCustomer: Customer, date: any) {

    const haulerDate = selectedCustomer.haulerApiDate
    const customerDate = date
    const customerApiRate = selectedCustomer.customerApiRate


    this.collectionRef.doc(selectedCustomer.customerName).update({
      customerApiDate: customerDate,
      haulerApiDate: haulerDate,
      customerApiRate: customerApiRate
    })
  }


}
