import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from '../../services/user.http.service';
import { decrypt } from '../../services/functions/encryption.function';

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
  userSubscription: Subscription;
  fragmentSubscription: Subscription;
  connected = true;

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

    this.fragmentSubscription = this.route.fragment.subscribe(frag => (this.fragment = frag));

    this.usersSubscription = this.userHttpService.users.subscribe(users => {
      if (!users) {
        this.connected = false;
      } else if (users.length === 0) {
        // TODO: redirect to a one-time user registration that forces
        //       an 'Administrator' account to be registered, once
        //       completed, the application is logged out and redirected
        //       to the login screen
      }
    });

    this.userSubscription = this.userHttpService.user.subscribe(user => {
      if (user) {
        user.username = decrypt(user.username);
        this.authService.user = user;
        this.authService.authorized.next(true);
      } else {
        this.authService.user = undefined;
        this.authService.authorized.next(false);
      }
    });

    this.loginSubscription = this.authService.authorized.subscribe(login => {
      this.isLoggedin = login;
      if (login) {
        this.router.navigate(['/home']);
      }
    });

    this.userHttpService.getUsers();
  }

  ngOnDestroy() {
    this.fragmentSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  onSubmit() {
    // this.authService.auth(this.loginForm.value);
    this.userHttpService.loginUser(this.loginForm.value);
    this.hasAttemptedLogin = true;
  }
}
