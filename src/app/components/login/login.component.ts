import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from '../../services/user.http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  fragment: string;
  isLoggedin = false;
  hasAttemptedLogin = false;
  loginSubscription: Subscription;
  usersSubscription: Subscription;
  fragmentSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userHttpService: UserHttpService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.usersSubscription = this.userHttpService.users.subscribe(
      users => {
        if (users) {
          // TODO: display a message that the application is working
          this.authService.authorizedUsers = users;
        } else {
          // TODO: redirect to a one-time user registration that forces
          //       an 'Administrator' account to be registered, once
          //       completed, the application is logged out and redirected
          //       to the login screen
        }
      }
    );

    this.loginSubscription = this.authService.authorized.subscribe(login => {
      this.isLoggedin = login;
      if (login) {
        this.router.navigate(['/home']);
      }
    });

    this.fragmentSubscription = this.route.fragment.subscribe(frag => (this.fragment = frag));

    this.authService.getUsers();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }

  onSubmit() {
    this.authService.auth(this.loginForm.value);
    this.hasAttemptedLogin = true;
  }
}
