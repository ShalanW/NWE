import {Injectable} from '@angular/core';
import {OnCallAccount} from "../model/stericycle/OnCallAccount";
import firebase from "firebase/compat/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Customer} from "../model/general/customer";

@Injectable({
  providedIn: 'root'
})
export class OnCallAccountService {

  collectionRef = this.db.collection('Customers');

  constructor(private db: AngularFirestore) {
  }

  addOnCallAccount(account: OnCallAccount, selectedCustomerName: string, selectedCustomer: Customer) {

    this.collectionRef.doc(selectedCustomer.customerName).set({
        accounts: firebase.firestore.FieldValue?.arrayUnion(account)
      },
      {merge: true})

    // this.collectionRef.doc(selectedCustomerName).set({
    //   accounts: {
    //     [1]: {
    //       ...account
    //     }
    //   }
    // }, {merge: true})

  }

  removeOnCallAccount(account: OnCallAccount, selectedCustomer: string) {
    console.log(account)
    this.collectionRef.doc(selectedCustomer).set({
        accounts: firebase.firestore.FieldValue.arrayRemove(account)
      },
      {merge: true})
  }

  editOnCallAccount(newAccount: OnCallAccount, customer: Customer, oldAccount: OnCallAccount) {


    this.collectionRef.doc(customer.customerName).set({
        accounts: firebase.firestore.FieldValue?.arrayRemove(oldAccount)
      },
      {merge: true})

    this.collectionRef.doc(customer.customerName).set({
        accounts: firebase.firestore.FieldValue?.arrayUnion(newAccount)
      },
      {merge: true})
  }

  editOnCallAccountAddNote(account: OnCallAccount, customer: Customer, notes: string[]) {

    console.log({account: account, name: customer, notes: notes})

    const oldAccount = account

    for (let note of oldAccount.notes) {
      notes.push(note)
    }

    this.removeOnCallAccount(oldAccount, customer.customerName)

    const newAccount = {...account, notes: notes}

    this.addOnCallAccount(newAccount, customer.customerName, customer)
  }

  editOnCallAccountDeleteNote(account: OnCallAccount, customer: Customer, notes: string[], index: number) {

    const oldAccount = account

    for (let note of oldAccount.notes) {
      notes.push(note)
    }

    notes.splice(index, 1)

    this.removeOnCallAccount(oldAccount, customer.customerName)

    const newAccount = {...account, notes: notes}

    this.addOnCallAccount(newAccount, customer.customerName, customer)
  }
}



