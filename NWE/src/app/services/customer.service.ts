import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Customer} from "../model/general/customer";

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
            }
          })
        })
      )
  }


  addCustomer(customer: Partial<Customer>) {
    const id = customer.customerName
    customer = {}
    this.collectionRef.doc(id).set(customer, {merge: true})
  }


}
