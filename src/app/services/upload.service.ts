import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { CallEvent } from '../models/call-event.model';
import { ServerResponse } from '../models/server-response.model';
import { Verifier } from '../models/verifier.model';

import { CsvService } from './csv.service';

@Injectable()
export class UploadService {
  eventsObject: CallEvent[];
  eventsUrl: string = 'http://localhost:3000/api/events';
  serverResponse: Subject<ServerResponse> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private csv: CsvService,
    private http: HttpClient
  ) { }

  verify(contents: string): Verifier {
    // Check headers and convert CSV to a JavaScript object if valid
    if (this.csv.headers === contents.slice(0, this.csv.headers.length)) {
      this.eventsObject = this.csv.toObject(contents);
      return new Verifier(true, `Valid headers.`);
    } else {
      return new Verifier(false, `Invalid headers.`)
    }
  }

  uploader() {
    this.http.post<ServerResponse>(
      this.eventsUrl,
      this.eventsObject,
      this.httpOptions
    ).subscribe(
      (res: ServerResponse) => {
        // emit the server's response message
        this.serverResponse.next(res);
      },
      error => {
        const errMessage: string = "Unable to connect to the API";
        console.error(error);
        this.serverResponse.next(new ServerResponse(true, errMessage, 0));
      }
    );
  }

}
