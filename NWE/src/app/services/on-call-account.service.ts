import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
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


  loadOnCallAccounts(): Observable<OnCallAccount[]> {
    return this.collectionRef.snapshotChanges()
      .pipe(
        map(contacts => {
            return contacts.map(contact => {
              return <OnCallAccount>{
                id: contact.payload.doc.id,
                ...contact.payload.doc.data() as OnCallAccount
              };
            })
          }
        )
      )
  }

  addOnCallAccount(account: OnCallAccount, selectedCustomerName: string, selectedCustomer: Customer) {

    const i = new Array(selectedCustomer.accounts).length


    this.collectionRef.doc(selectedCustomerName).set({
      accounts: {
        [account.type]: {
          ...account
        }
      }
    }, {merge: true})
  }

  removeOnCallAccount(account: OnCallAccount, selectedCustomer: string) {



    this.collectionRef.doc(selectedCustomer).set({accounts: })
  }

  // removeOnCallAccount(account: OnCallAccount, selectedCustomer: string) {
  //   this.collectionRef.doc(selectedCustomer).set({
  //       accounts: firebase.firestore.FieldValue.arrayRemove(account)
  //     },
  //     {merge: true})
  // }


}
