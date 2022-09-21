import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {OnCallAccount} from "../model/stericycle/OnCallAccount";

@Injectable({
  providedIn: 'root'
})
export class OnCallAccountService {

  collectionRef = this.db.collection('OnCallServiceAccounts');

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

  addHaulerContact(account: OnCallAccount) {
    this.collectionRef.add({...account});
  }
}
