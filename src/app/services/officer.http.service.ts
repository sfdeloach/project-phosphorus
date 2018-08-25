import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Officer } from '../models/officer.model';
import { ReplaceOneResponse } from '../models/responses/replace.one.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { RemoveResponse } from '../models/responses/remove.model';
import { UpdateResponse } from '../models/responses/update.model';
import { environment } from '../../environments/environment';

@Injectable()
export class OfficerHttpService {
  loadedOfficers: Officer[] = [];
  officer: Subject<Officer> = new Subject();
  officers: Subject<Officer[]> = new Subject();
  response: Subject<any> = new Subject();
  officersUrl: string = environment.apiUrl + 'officers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getOfficer(id: string) {
    this.http.get<Officer[]>(this.officersUrl + `/${id}`).subscribe(
      (ofc: Officer[]) => {
        this.officer.next(ofc[0]);
      },
      error => {
        console.error(error);
      }
    );
  }

  getOfficers() {
    this.http.get<Officer[]>(this.officersUrl).subscribe(
      (ofcs: Officer[]) => {
        if (Array.isArray(ofcs)) {
          this.loadedOfficers = ofcs;
          this.officers.next(ofcs);
        } else {
          // an unexpected non-array return from server
          this.loadedOfficers = [ofcs];
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
    this.http
      .post<InsertManyResponse<Officer>>(this.officersUrl, { officers: [ofc] }, this.httpOptions)
      .subscribe(
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
    this.http
      .put<ReplaceOneResponse>(this.officersUrl + `/${_id}`, { officer: ofc }, this.httpOptions)
      .subscribe(
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
    this.http.delete<RemoveResponse>(this.officersUrl + `/${ofc._id}`, this.httpOptions).subscribe(
      (res: RemoveResponse) => {
        this.response.next(res);
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }

  updateSquadAssignments(query) {
    this.resetSquadAssignments().subscribe(
      (res: UpdateResponse) => {
        if (query.$or) {
          this.setSquadAssignments(query);
        } else {
          this.response.next(res);
        }
      },
      err => {
        console.error(err);
        this.response.next(err);
      }
    );
  }

  resetSquadAssignments(): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>(
      this.officersUrl + '/include',
      {
        query: {},
        update: { $set: { include: false } }
      },
      this.httpOptions
    );
  }

  setSquadAssignments(query) {
    this.http
      .put<UpdateResponse>(
        this.officersUrl + '/include',
        {
          query: query,
          update: { $set: { include: true } }
        },
        this.httpOptions
      )
      .subscribe(
        (res: UpdateResponse) => {
          this.response.next(res);
        },
        error => {
          console.error(error);
          this.response.next(error);
        }
      );
  }

  updateEffectiveDates(update) {
    this.http
      .put<UpdateResponse>(
        this.officersUrl + '/include',
        {
          query: {},
          update: { $set: { effDate: update } }
        },
        this.httpOptions
      )
      .subscribe(
        (res: UpdateResponse) => {
          this.response.next(res);
        },
        error => {
          console.error(error);
          this.response.next(error);
        }
      );
  }
}
