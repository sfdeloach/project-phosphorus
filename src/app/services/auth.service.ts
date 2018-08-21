import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';
import { UserHttpService } from './user.http.service';
import { decrypt } from './functions/encryption.function';

@Injectable()
export class AuthService {
  authorized = new Subject<boolean>();
  user: User;
  authorizedUsers: User[];

  constructor(private router: Router, private userHttpService: UserHttpService) {}

  isAdmin(): boolean {
    return this.user ? this.user.authLevel === 'Administrator' : false;
  }

  isAuthor(): boolean {
    return this.user
      ? this.user.authLevel === 'Administrator' || this.user.authLevel === 'Author'
      : false;
  }

  isViewOnly(): boolean {
    return this.user
      ? this.user.authLevel === 'Administrator' ||
          this.user.authLevel === 'Author' ||
          this.user.authLevel === 'View Only'
      : false;
  }

  getUsers(): void {
    this.userHttpService.getUsers();
  }

  auth(login: User): void {
    const lookupUser: User = this.authorizedUsers.find(user => {
      return decrypt(user.username) === login.username;
    });

    // For development purposes, authorization override can be made here
    if (lookupUser && decrypt(lookupUser.password) === login.password) {
      lookupUser.username = decrypt(lookupUser.username);
      this.user = lookupUser;
      this.authorized.next(true);
    } else {
      this.user = undefined;
      this.authorized.next(false);
    }
  }

  logout(): void {
    this.user = undefined;
    this.authorized.next(false);
  }
}
