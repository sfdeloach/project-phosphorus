import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Officer } from '../models/officer.model';
import { Result } from '../models/result.model';

@Injectable()
export class OfficerService {
  officer: Subject<Officer> = new Subject();
  officers: Subject<Officer[]> = new Subject();
  serverResponse: Subject<Result> = new Subject();
  officersUrl: string = 'http://localhost:3000/api/officers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getOfficer(id: string) {
    this.http.get<Officer>(
      this.officersUrl + `/${id}`
    ).subscribe(
      (ofc: Officer) => {
        this.officer.next(ofc);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getOfficers() {
    this.http.get<Officer[]>(
      this.officersUrl
    ).subscribe(
      (ofcs: Officer[]) => {
        this.officers.next(ofcs);
      },
      err => {
        console.error(err);
      }
    );
  }

  insertOfficer(ofc: Officer) {
    this.http.post<Result>(
      this.officersUrl + `/new`,
      { officer: ofc },
      this.httpOptions
    ).subscribe(
      (res: Result) => {
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "Unable to connect to the API";
        console.error(error);
        this.serverResponse.next(new Result(true, errMessage, 0));
      }
    );
  }

  updateOfficer(ofc: Officer) {
    this.http.put<Result>(
      this.officersUrl + `/${ofc._id}`,
      { officer: ofc },
      this.httpOptions
    ).subscribe(
      (res: Result) => {
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "Unable to connect to the API";
        console.error(error);
        this.serverResponse.next(new Result(true, errMessage, 0));
      }
    );
  }

  deleteOfficer(ofc: Officer) {
    this.http.delete<Result>(
      this.officersUrl + `/${ofc._id}`,
      this.httpOptions
    ).subscribe(
      (res: Result) => {
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "An error occurred during a DELETE request"
        console.error(errMessage);
        console.error(error);
        this.serverResponse.next(new Result(true, errMessage, 0));
      }
    );
  }

}
