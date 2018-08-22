import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';
import { UserHttpService } from './user.http.service';

@Injectable()
export class AuthService {
  authorized = new Subject<boolean>();
  user: User;

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

  logout(): void {
    this.user = undefined;
    this.authorized.next(false);
  }
}
