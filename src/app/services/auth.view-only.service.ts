import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthViewOnlyService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (
      this.authService.user &&
      (this.authService.user.authLevel === 'View Only' ||
        this.authService.user.authLevel === 'Author' ||
        this.authService.user.authLevel === 'Administrator')
    ) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
