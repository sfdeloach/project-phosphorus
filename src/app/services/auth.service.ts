import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Subject } from 'rxjs/Subject';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService implements CanActivate {
  guardApplication = environment.production;
  authorized = new Subject<boolean>();
  user: string;

  // To be replaced with a call to a db
  authorizedUsers: Login[] = [
    new Login('test', 'test')
  ];

  constructor(private router: Router) {}

  auth(login: Login): void {
    // To be replaced with a call to a db
    const lookupUser = this.authorizedUsers.find(user => {
      return user.username === login.username;
    });

    if (lookupUser && lookupUser.password === login.password) {
      this.user = lookupUser.username;
      this.authorized.next(true);
    } else {
      this.user = undefined;
      this.authorized.next(false);
    }
  }

  canActivate(): boolean {
    if (this.user || !this.guardApplication) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  logout(): void {
    this.user = undefined;
    this.authorized.next(false);
  }
}
