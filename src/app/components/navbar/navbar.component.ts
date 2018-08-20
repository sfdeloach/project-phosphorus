import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showOfficerMenu = false;
  timerID: any;
  authSub: Subscription;
  loggedin = false;
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSub = this.authService.authorized.subscribe(auth => {
      this.loggedin = auth;
      this.user = this.authService.user;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.loggedin = false;
    this.user = undefined;

    this.router.navigate(['/login'], {
      fragment: 'loggedout'
    });
  }
}
