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
        accounts: firebase.firestore.FieldValue.arrayUnion(account)
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
    this.collectionRef.doc(selectedCustomer).set({
        accounts: firebase.firestore.FieldValue.arrayRemove(account)
      },
      {merge: true})
  }


}
