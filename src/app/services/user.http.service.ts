import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { RemoveResponse } from '../models/responses/remove.model';
import { environment } from '../../environments/environment';
import { encrypt } from '../functions/encryption.function';

@Injectable()
export class UserHttpService {
  users = new Subject<User[]>();
  user = new Subject<User>();
  response: Subject<any> = new Subject();
  usersUrl: string = environment.apiUrl + 'users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  loginUser(userAttempt: User) {
    userAttempt.username = encrypt(userAttempt.username);
    userAttempt.password = encrypt(userAttempt.password);
    this.http
      .post<User>(`${this.usersUrl}/login/${userAttempt.username}`, userAttempt, this.httpOptions)
      .subscribe(
        (user: User) => {
          this.user.next(user);
        },
        err => {
          console.error(err);
          this.response.next(err);
        }
      );
  }

  getUsers() {
    this.http.get<User[]>(this.usersUrl).subscribe(
      (users: User[]) => {
        this.users.next(users);
      },
      err => {
        console.error(err);
        this.users.next([err]);
      }
    );
  }

  getUser(id: string) {
    this.http.get<User>(`${this.usersUrl}/${id}`).subscribe(
      (user: User) => {
        this.user.next(user);
      },
      err => {
        console.error(err);
        this.response.next(err);
      }
    );
  }

  insertUser(user: User) {
    this.http
      .post<InsertManyResponse<User>>(this.usersUrl, { user: user }, this.httpOptions)
      .subscribe(
        (res: InsertManyResponse<User>) => {
          this.response.next(res);
        },
        error => {
          console.error(error);
          this.response.next(error);
        }
      );
  }

  deleteUser(id: string) {
    this.http.delete<RemoveResponse>(`${this.usersUrl}/${id}`, this.httpOptions).subscribe(
      (res: RemoveResponse) => {
        this.response.next(res);
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }

  replaceUser(id: string, user: User) {
    this.http.delete<RemoveResponse>(`${this.usersUrl}/${id}`, this.httpOptions).subscribe(
      (deleteRes: RemoveResponse) => {
        this.http
          .post<InsertManyResponse<User>>(this.usersUrl, { user: user }, this.httpOptions)
          .subscribe(
            (insertRes: InsertManyResponse<User>) => {
              this.response.next(insertRes);
            },
            error => {
              console.error(error);
              this.response.next(error);
            }
          );
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }
}
