import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserHttpService } from '../../../services/user.http.service';
import { AuthTypesList } from '../../../services/lists/auth.types.list';
import { User } from '../../../models/user.model';
import { encrypt } from '../../../services/functions/encryption.function';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit, OnDestroy {
  newUserForm: FormGroup;
  authLevels: string[];
  passwordsMismatch = false;
  insertSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authList: AuthTypesList,
    private userHttpService: UserHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.insertSubscription = this.userHttpService.response.subscribe(() => {
      this.router.navigate(['/users']);
    });

    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      authLevel: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      deptID: ['', Validators.required],
      password01: ['', Validators.required],
      password02: ['', Validators.required]
    });

    this.authLevels = this.authList.authTypes.sort();
  }

  ngOnDestroy() {
    this.insertSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.newUserForm.value.password01 !== this.newUserForm.value.password02) {
      this.passwordsMismatch = true;
    } else {
      this.passwordsMismatch = false;
      const newUser = new User(
        this.newUserForm.value.authLevel,
        this.newUserForm.value.deptID,
        this.newUserForm.value.firstname,
        this.newUserForm.value.lastname,
        encrypt(this.newUserForm.value.password01),
        encrypt(this.newUserForm.value.username)
      );
      this.userHttpService.insertUser(newUser);
    }
  }

  resetForm() {
    this.newUserForm.reset();
  }
}
