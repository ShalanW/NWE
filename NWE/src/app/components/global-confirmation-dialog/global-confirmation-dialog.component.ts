import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OnCallAccount} from "../../model/stericycle/OnCallAccount";
import {Customer} from "../../model/general/customer";

@Component({
  selector: 'app-global-confirmation-dialog',
  templateUrl: './global-confirmation-dialog.component.html',
  styleUrls: ['./global-confirmation-dialog.component.scss']
})
export class GlobalConfirmationDialogComponent implements OnInit {

  deleteAccountPassword: string = '';

  constructor(public dialogRef: MatDialogRef<GlobalConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { dialogType: string, dialogData: { account: OnCallAccount, customer: Customer, customerName: string } }) {
  }

  ngOnInit(): void {
  }

  onConfirmDeleteAccount() {
    this.dialogRef.close(this.deleteAccountPassword)
  }

}
