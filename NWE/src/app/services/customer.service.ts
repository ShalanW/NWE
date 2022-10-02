import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Customer} from "../model/general/customer";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Timestamp} from "firebase/firestore";
import {DatePipe} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  collectionRef = this.db.collection('Customers');


  constructor(private db: AngularFirestore, public datePipe: DatePipe) {
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
              customerNameLower: customer.payload.doc.id,
              haulerApiDate: customer.payload.doc?.get('haulerApiDate')?.toDate(),
              customerApiDate: customer.payload.doc?.get('customerApiDate')?.toDate(),
              customerApiRate: customer.payload.doc?.get('customerApiRate')


            }
          })
        })
      )

  }

  // loadSelectedCustomer(manualString: string): Observable<Customer[]> {
  //   return this.db.collection(
  //     'Customers',
  //     ref => ref.where('customerName', '==', manualString)
  //   ).snapshotChanges()
  //     .pipe(
  //       map(customers => {
  //         return customers.map(customer => {
  //           return <Customer>{
  //             id: customer.payload.doc.id,
  //             ...customer.payload.doc.data() as Customer,
  //             customerName: customer.payload.doc.id,
  //             haulerApiDate: customer.payload.doc?.get('haulerApiDate')?.toDate(),
  //             customerApiDate: customer.payload.doc?.get('customerApiDate')?.toDate(),
  //             customerApiRate: customer.payload.doc?.get('customerApiRate')
  //
  //
  //           }
  //         })
  //       })
  //     )
  //
  // }

  loadSelectedCustomer(customerName: string, selectedCustomer: Customer): Observable<Customer[]> {
    return this.db.collection(
      'Customers',
      ref => ref.where('customerName', '==', selectedCustomer.customerName)
    ).snapshotChanges()
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
    this.collectionRef.doc(newCustomer.customerName).set(newCustomer, {merge: true})
  }

  updateCustomer(selectedCustomer: any, date: string | '') {

    console.log(date)

    const year = +date.slice(0, 4)
    const month = +date.slice(5, 7)
    const day = +date.slice(8, 10)

    const haulerDate = Timestamp.fromDate(selectedCustomer.haulerApiDate)
    const customerDate = Timestamp.fromDate(new Date(year, month - 1, day))
    const customerApiRate = selectedCustomer.customerApiRate

    console.log(customerDate)


    this.collectionRef.doc(selectedCustomer.customerName).update({
      customerApiDate: customerDate,
      haulerApiDate: haulerDate,
      customerApiRate: customerApiRate
    })
  }

  updateCustomerHelper(selectedCustomer: Customer) {


    this.collectionRef.doc(selectedCustomer.customerName).update({
      customerName: selectedCustomer.customerName
    })
  }

  deleteCustomer(selectedCustomer: Customer) {
    this.collectionRef.doc(selectedCustomer.customerName).delete()
  }


}
