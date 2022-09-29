import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Hauler} from "../model/general/hauler";

@Injectable({
  providedIn: 'root'
})
export class HaulerService {

  collectionRef = this.db.collection('HaulerContacts');


  constructor(private db: AngularFirestore) {
  }


  loadHaulerContacts(): Observable<Hauler[]> {
    return this.collectionRef.snapshotChanges()
      .pipe(
        map(contacts => {
            return contacts.map(contact => {
              return <Hauler>{
                id: contact.payload.doc.id,
                ...contact.payload.doc.data() as Hauler,

              };
            })
          }
        )
      )
  }

  addHaulerContact(contact: any) {


    this.collectionRef.doc(contact.hauler).set({


      reps: {
        [contact.name]: {
          phone: contact.phone
        }
      }

    }, {merge: true})

  }

  updateHaulerContact(contact: any) {
    this.collectionRef.doc('WM').set({
      reps: {
        ['Jim']: {
          phone: contact.phone
        }
      }
    }, {merge: true})
  }
}
