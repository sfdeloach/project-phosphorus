import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoggedin = false;
  loginSub: Subscription;
  fragment: string;
  fragmentSub: Subscription;
  hasAttemptedLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginSub = this.authService.authorized.subscribe(login => {
      this.isLoggedin = login;
      if (login) {
        this.router.navigate(['/home']);
      }
    });

    this.fragmentSub = this.route.fragment.subscribe(
      frag => (this.fragment = frag)
    );
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
    this.fragmentSub.unsubscribe();
  }

  onSubmit() {
    this.authService.auth(this.loginForm.value);
    this.hasAttemptedLogin = true;
  }

}
