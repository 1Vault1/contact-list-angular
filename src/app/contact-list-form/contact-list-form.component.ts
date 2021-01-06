import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact, ContactListFormService} from './contact-list-form.service';

@Component({
  selector: 'app-contact-list-form',
  templateUrl: './contact-list-form.component.html',
  styleUrls: ['./contact-list-form.component.scss']
})

export class ContactListFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]),
  });

  contacts: Contact[] = [];

  constructor(private contactListServise: ContactListFormService) { }

  ngOnInit(): void {
    this.contactListServise.onInit().subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  addContact() {
    this.contactListServise.addContact({
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
    }).subscribe(contact => {
        this.contacts.push(contact);
      });
  }

  removeContact(id: number) {
    this.contactListServise.removeContact(id).subscribe(() => {
        this.contacts = this.contacts.filter( contact => contact.id !== id);
      });
  }
}
