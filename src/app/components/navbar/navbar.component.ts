import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showOfficerMenu = false;
  timerID: any;
  authSubscription: Subscription;
  loggedin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authorizedSubject.subscribe(
      auth => {
        this.loggedin = auth;
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.loggedin = false;
  }

  toggleOfficerMenu() {
    this.showOfficerMenu = !this.showOfficerMenu;
  }

  onExit() {
    // start timer
    this.timerID = setTimeout(() => {
      this.showOfficerMenu = false;
    }, 2500);
  }

  onEnter() {
    // stop timer
    clearTimeout(this.timerID);
  }
}
