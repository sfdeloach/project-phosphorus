import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  authorized = false;
  authorizedSubject = new Subject<boolean>();
  authorizedUsers: Login[] = [
    new Login('sally', '1234'),
    new Login('billy', '1234')
  ];

  constructor() {}

  auth(credentials: Login) {
    const lookupUser = this.authorizedUsers.find(user => {
      return user.username === credentials.username;
    });

    if (lookupUser && lookupUser.password === credentials.password) {
      this.authorized = true;
      this.authorizedSubject.next(true);
    } else {
      this.authorized = false;
      this.authorizedSubject.next(false);
    }
  }

  logout() {
    this.authorized = false;
    this.authorizedSubject.next(false);
  }
}
