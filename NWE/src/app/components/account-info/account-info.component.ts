import {Component, OnInit} from '@angular/core';
import {STERICYCLEACCOUNTS} from "../../hardCodeData/hardCodeData";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  ssAccounts = STERICYCLEACCOUNTS[0];

  constructor() {
  }

  ngOnInit(): void {
  }

}
// Angular ngIf Directive and the Elvis Operator (Angular University)

