import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Hauler} from "../../model/general/hauler";
import {HaulerService} from "../../services/hauler.service";

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

  $haulerContacts: Observable<Hauler[]>;


  constructor(private hcs: HaulerService, private fb: FormBuilder) {
    this.$haulerContacts = this.hcs.loadHaulerContacts();

  }

  ngOnInit(): void {
  }

  onAddHaulerContact() {
    this.hcs.addHaulerContact(this.form.value)
    this.form.reset()
  }

  onUpdateHaulerContact() {
    this.hcs.updateHaulerContact(this.form.value)
    this.form.reset()
  }
}
