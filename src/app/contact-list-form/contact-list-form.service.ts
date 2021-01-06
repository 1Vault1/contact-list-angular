import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Contact {
  name: string;
  email: string;
  phone: string;
  id?: number;
}

@Injectable({providedIn: 'root'})
export class ContactListFormService {
  constructor(private http: HttpClient) {}

  onInit(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://5ff2ebf728c3980017b18cdc.mockapi.io/contacts');
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('https://5ff2ebf728c3980017b18cdc.mockapi.io/contacts', contact);
  }

  removeContact(id: number): Observable<void> {
    return this.http.delete<void>(`https://5ff2ebf728c3980017b18cdc.mockapi.io/contacts/${id}`);
  }
}
