import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Verifier } from '../models/verifier.model';
import { CallEvent } from '../models/call-event.model';

import { CsvService } from './csv.service';

@Injectable()
export class UploadService {
  eventsObject: CallEvent[];
  eventsUrl: string = 'http://localhost:3000/api/events';
  linesRead: Subject<number> = new Subject();
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
    this.http.post<CallEvent[]>(
      this.eventsUrl,
      this.eventsObject,
      this.httpOptions
    ).subscribe(
      (serverResponse: any) => {
        console.log(serverResponse.message);
        // update linesRead after server responds
        this.linesRead.next(this.eventsObject.length);
      },
      error => {
        console.log("Something went wrong during the upload of the file!!!");
        console.log(error);
        // no lines were read
        this.linesRead.next(0);
      }
    );
  }

}
