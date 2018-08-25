import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from '../../services/user.http.service';
import { decrypt } from '../../functions/encryption.function';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  fragment: string;
  isLoggedin = false;
  isCheckingAuth = false;
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

    this.usersSubscription = this.userHttpService.users.subscribe((users: User[]) => {
      if (users.length === 0) {
        this.authService.user = new User('Administrator', '[guest]');
        this.authService.authorized.next(true);
      } else if (users[0].error) {
        this.connected = false;
        console.error(users[0].error);
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
      this.isCheckingAuth = false;
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
    this.isCheckingAuth = true;
    this.hasAttemptedLogin = true;
    setTimeout(() => {
      this.userHttpService.loginUser(this.loginForm.value);
    }, 1000);
  }
}
