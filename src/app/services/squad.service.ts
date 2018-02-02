import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Officer } from '../models/officer.model';
import { ServerResponse } from '../models/server-response.model';

@Injectable()
export class SquadService {
  officers: Subject<Officer[]> = new Subject();
  serverResponse: Subject<ServerResponse> = new Subject();
  officersUrl: string = 'http://localhost:3000/api/officers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getOfficers() {
    this.http.get<Officer[]>(
      this.officersUrl
    ).subscribe(
      (ofcs: Officer[]) => {
        this.officers.next(ofcs);
      },
      (error) => {
        console.error(error);
      }
      );
  }

  insertOfficer(ofc: Officer) {
    this.http.post<ServerResponse>(
      this.officersUrl + `/new`,
      { officer: ofc },
      this.httpOptions
    ).subscribe(
      (res: ServerResponse) => {
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "Unable to connect to the API";
        console.error(error);
        this.serverResponse.next(new ServerResponse(true, errMessage, 0));
      }
    );
  }

  deleteOfficer(ofc: Officer) {
    this.http.delete<ServerResponse>(
      this.officersUrl + `/${ofc._id}`,
      this.httpOptions
    ).subscribe(
      (res: ServerResponse) => {
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "An error occurred during a DELETE request"
        console.error(errMessage);
        console.error(error);
        this.serverResponse.next(new ServerResponse(true, errMessage, 0));
      }
    );
  }

}
