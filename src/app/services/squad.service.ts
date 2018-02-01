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

  getOfficer(id: number): Officer {
    return this.officers[0];
  }

}
