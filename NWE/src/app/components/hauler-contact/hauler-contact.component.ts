import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {HaulerContact} from "../../model/general/hauler-contact";
import {HaulerContactServiceService} from "../../services/hauler-contact-service.service";

@Component({
  selector: 'app-hauler-contact',
  templateUrl: './hauler-contact.component.html',
  styleUrls: ['./hauler-contact.component.scss']
})
export class HaulerContactComponent implements OnInit {

  form = this.fb.group({
    name: ['', [Validators.required]],
    hauler: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  $haulerContacts: Observable<HaulerContact[]>;


  constructor(private hcs: HaulerContactServiceService, private fb: FormBuilder) {
    this.$haulerContacts = this.hcs.loadHaulerContacts();

  }

  ngOnInit(): void {
  }

  onAddHaulerContact() {
    this.hcs.addHaulerContact(this.form.value as HaulerContact)
    this.form.reset()
  }
}
