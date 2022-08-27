import {Component, OnInit} from '@angular/core';
import {STERICYCLEACCOUNTS} from "../../hardCodeData/hardCodeData";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  ssAccounts = STERICYCLEACCOUNTS[0];




  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
  }


  helper() {
    const tutorialsref = this.db.collection('NaderCollection');
    const tutorial = { title: 'Hi baby 😘', url: 'bezkoder.com/zkoder-tutorial' };

    tutorialsref.add({ ...tutorial});

  }
}
// Angular ngIf Directive and the Elvis Operator (Angular University)

