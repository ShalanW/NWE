import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {HaulerContact} from "../model/general/hauler-contact";

@Injectable({
  providedIn: 'root'
})
export class HaulerContactServiceService {

  collectionRef = this.db.collection('HaulerContacts');


  constructor(private db: AngularFirestore) {
  }


  loadHaulerContacts(): Observable<HaulerContact[]> {
    return this.collectionRef.snapshotChanges()
      .pipe(
        map(contacts => {
            return contacts.map(contact => {
              return <HaulerContact>{
                id: contact.payload.doc.id,
                ...contact.payload.doc.data() as HaulerContact
              };
            })
          }
        )
      )
  }

  addHaulerContact(contact: HaulerContact) {
    this.collectionRef.add({...contact});
  }

}

