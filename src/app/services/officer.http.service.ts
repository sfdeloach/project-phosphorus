import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { ApiUrlsList } from './lists/api.urls.list';

import { Officer } from '../models/officer.model';
import { ReplaceOneResponse } from '../models/responses/replace.one.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { RemoveResponse } from '../models/responses/remove.model';

@Injectable()
export class OfficerHTTPService {
  officer: Subject<Officer> = new Subject();
  officers: Subject<Officer[]> = new Subject();
  response: Subject<any> = new Subject(); // TODO: type?
  officersUrl: string = this.url.officerAPI;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private url: ApiUrlsList
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
        if (Array.isArray(ofcs)) {
          this.officers.next(ofcs);
        } else {
          // most likely an error from the server
          this.officers.next([ofcs]);
        }
      },
      err => {
        console.error(err);
        this.officers.next([err]);
      }
      );
  }

  insertOfficer(ofc: Officer) {
    this.http.post<InsertManyResponse<Officer>>(
      this.officersUrl,
      { officers: [ofc] },
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

  // TODO In progress
  updateSquadAssignments() {
    this.http.put<any>( // UpdateResponse
      this.officersUrl + `/include`,
      {
        query: {},
        update: {'$set': {
          include: true
        }}
      },
      this.httpOptions
    ).subscribe(
      (res: any) => { // UpdateResponse
        this.response.next(res);
        console.log(res); // TODO: RAT
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
      );
  }

  deleteOfficer(ofc: Officer) {
    this.http.delete<RemoveResponse>(
      this.officersUrl + `/${ofc._id}`,
      this.httpOptions
    ).subscribe(
      (res: RemoveResponse) => {
        this.response.next(res);
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
      );
  }

}
