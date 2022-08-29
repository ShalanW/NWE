import {Component, OnInit} from '@angular/core';
import {STERICYCLEACCOUNTS} from "../../hardCodeData/hardCodeData";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  ssAccounts = STERICYCLEACCOUNTS[0];
  form = this.fb.group({
    example: ['', [Validators.required]]
  });


  constructor(private db: AngularFirestore, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }


  helper() {
    const tutorialsref = this.db.collection('NaderCollection');
    const tutorial = {title: 'Hi 😘', url: 'bezkoder.com/zkoder-tutorial'};

    tutorialsref.add({...tutorial});

  }


}

// Angular ngIf Directive and the Elvis Operator (Angular University)

