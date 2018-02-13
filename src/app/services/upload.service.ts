import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Episode } from '../models/episode.model';
import { ServerResponse } from '../models/server-response.model';
import { Verifier } from '../models/verifier.model';

import { CsvService } from './csv.service';

@Injectable()
export class UploadService {
  episodes: Episode[];
  episodesUrl: string = 'http://localhost:3000/api/episodes';
  serverResponse: Subject<ServerResponse> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private csv: CsvService,
    private http: HttpClient
  ) { }

  verify(contents: string): Verifier {
    // Convert line endings - Windows style ("\r\n") to Unix style ("\n")
    let convertedContents = contents.replace(/[\r]/g, '');

    // Check headers and convert CSV to a JavaScript object if valid
    if (this.csv.headers === convertedContents.slice(0, this.csv.headers.length)) {
      this.episodes = this.csv.toObject(convertedContents);
      return new Verifier(true, `Valid headers.`);
    } else {
      return new Verifier(false, `Invalid headers.`)
    }
  }

  uploader() {
    this.http.post<ServerResponse>(
      this.episodesUrl,
      {
        passcode: '8uJ4eC1s^0iB5bR0', // '8uJ4eC1s^0iB5bR0'
        payload: this.episodes
      },
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
