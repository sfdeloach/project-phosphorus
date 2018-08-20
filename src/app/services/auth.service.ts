import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';
import { UserHttpService } from '../services/user.http.service';
import { decrypt } from '../services/functions/encryption.function';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService /*implements CanActivate*/ {
  authorized = new Subject<boolean>();
  user: User;
  authorizedUsers: User[];

  constructor(private router: Router, private userHttpService: UserHttpService) {}

  getUsers(): void {
    this.userHttpService.getUsers();
  }

  auth(login: User): void {
    const lookupUser: User = this.authorizedUsers.find(user => {
      return decrypt(user.username) === login.username;
    });

    if (lookupUser && decrypt(lookupUser.password) === login.password) {
      lookupUser.username = decrypt(lookupUser.username);
      this.user = lookupUser;
      this.authorized.next(true);
    } else {
      this.user = undefined;
      this.authorized.next(false);
    }
  }

  // canActivate(): boolean {
  //   if (this.user || !environment.production) { // Remove for production
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  logout(): void {
    this.user = undefined;
    this.authorized.next(false);
  }
}
