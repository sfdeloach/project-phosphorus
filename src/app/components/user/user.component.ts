import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { UserHttpService } from '../../services/user.http.service';
import { Subscription } from 'rxjs/Subscription';
import { decrypt } from '../../functions/encryption.function';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  users: User[];
  userSubscription: Subscription;
  sortToggle = 1;

  constructor(private userHttpService: UserHttpService) {}

  ngOnInit() {
    this.userSubscription = this.userHttpService.users.subscribe(users => {
      // decrypt usernames
      users.map(user => {
        user.username = decrypt(user.username);
        return user;
      });

      this.users = users;
    });

    this.userHttpService.getUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onHeaderClick(property: string) {
    this.sortToggle = this.sortToggle * -1;
    this.users.sort(this.sortByProperty(property));
  }

  sortByProperty(property: string) {
    return (a: User, b: User): number => {
      if (a[property] < b[property]) {
        return -1 * this.sortToggle;
      }
      if (a[property] > b[property]) {
        return 1 * this.sortToggle;
      }
      return 0;
    };
  }
}
