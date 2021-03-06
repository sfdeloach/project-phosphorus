import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UserHttpService } from '../../../services/user.http.service';
import { AuthTypesList } from '../../../lists/auth.types.list';
import { User } from '../../../models/user.model';
import { encrypt, decrypt } from '../../../functions/encryption.function';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {
  updateSubscription: Subscription;
  userSubscription: Subscription;
  userForm: FormGroup;
  authLevels: string[];
  passwordsMismatch = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userHttpService: UserHttpService,
    private authList: AuthTypesList,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.updateSubscription = this.userHttpService.response.subscribe(() => {
      this.router.navigate(['/users']);
    });

    this.userSubscription = this.userHttpService.user.subscribe(user => {
      this.userForm.setValue({
        username: decrypt(user[0].username),
        authLevel: user[0].authLevel,
        lastname: user[0].lastname,
        firstname: user[0].firstname,
        deptID: user[0].deptID,
        password01: '',
        password02: ''
      });
    });

    this.userForm = this.formBuilder.group({
      authLevel: ['', Validators.required],
      deptID: ['0', Validators.required],
      firstname: ['...please standby', Validators.required],
      lastname: ['...please standby', Validators.required],
      password01: ['...please standby', Validators.required],
      password02: ['...please standby', Validators.required],
      username: ['...please standby', Validators.required]
    });

    this.authLevels = this.authList.authTypes.sort();
    this.userHttpService.getUser(this.route.snapshot.params.id);
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  deleteUser() {
    this.userHttpService.deleteUser(this.route.snapshot.params.id);
  }

  onSubmit() {
    if (this.userForm.value.password01 !== this.userForm.value.password02) {
      this.passwordsMismatch = true;
    } else {
      const newUser = new User(
        this.userForm.value.authLevel,
        encrypt(this.userForm.value.username),
        this.userForm.value.deptID,
        this.userForm.value.firstname,
        this.userForm.value.lastname,
        encrypt(this.userForm.value.password01)
      );
      this.userHttpService.replaceUser(this.route.snapshot.params.id, newUser);
    }
  }
}
