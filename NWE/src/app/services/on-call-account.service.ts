import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {OnCallAccount} from "../model/stericycle/OnCallAccount";
import firebase from "firebase/compat/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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

  addHaulerContact(account: OnCallAccount, selectedCustomer: string) {


    this.collectionRef.doc(selectedCustomer).set({accounts: firebase.firestore.FieldValue.arrayUnion(account)}, {merge: true})


    // this.collectionRef.add({...account});
  }
}
