import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Officer } from '../models/officer.model';
import { ReplaceOneResponse } from '../models/responses/replace.one.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';

@Injectable()
export class OfficerService {
  officer: Subject<Officer> = new Subject();
  officers: Subject<Officer[]> = new Subject();
  response: Subject<any> = new Subject(); // TODO: type?
  officersUrl: string = 'http://localhost:3000/api/officers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getOfficer(id: string) {
    this.http.get<Officer[]>(
      this.officersUrl + `/${id}`
    ).subscribe(
      (ofc: Officer[]) => {
        this.officer.next(ofc[0]);
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
    this.http.post<InsertManyResponse<Officer>>(
      this.officersUrl,
      { officers: [ ofc ] },
      this.httpOptions
    ).subscribe(
      (res: InsertManyResponse<Officer>) => {
        this.response.next(res);
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }

  updateOfficer(_id: string, ofc: Officer) {
    this.http.put<ReplaceOneResponse>(
      this.officersUrl + `/${_id}`,
      { officer: ofc },
      this.httpOptions
    ).subscribe(
      (res: ReplaceOneResponse) => {
        this.response.next(res);
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }

  deleteOfficer(ofc: Officer) {
    this.http.delete<any>(
      this.officersUrl + `/${ofc._id}`,
      this.httpOptions
    ).subscribe(
      (res: any) => {
        this.response.next(res);
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }

}
