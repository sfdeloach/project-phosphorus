import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (
        (this.authService.user && this.authService.isAdmin()) ||
        this.authService.noRegisteredUsers
      ) {
        resolve(true);
      } else {
        this.router.navigate(['/unauthorized']);
        resolve(false);
      }
    });
  }
}
