import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthViewOnlyGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (
        this.authService.user &&
        (this.authService.user.authLevel === 'View Only' ||
          this.authService.user.authLevel === 'Author' ||
          this.authService.user.authLevel === 'Administrator')
      ) {
        resolve(true);
      } else {
        this.router.navigate(['/unauthorized']);
        resolve(false);
      }
    });
  }
}
