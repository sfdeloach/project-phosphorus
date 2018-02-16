import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';
import { Result } from '../models/result.model';

import { CsvService } from './csv.service';
import { CafeService } from './cafe.service';
import { XCADService } from './xcad.service';

@Injectable()
export class UploadService {
  episodes: Episode[] = [];
  episodesUrl: string = 'http://localhost:3000/api/episodes';
  serverResponse: Subject<Result> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private csv: CsvService,
    private cafe: CafeService,
    private xcad: XCADService,
    private http: HttpClient
  ) { }

  verify(fileContents: string, officers: Officer[]): Result {
    // Convert line endings - Windows style ("\r\n") to Unix style ("\n")
    const csvToTableArray = this.csv.toTableArray(fileContents);

    // Convert CSV to a JavaScript object if the file is valid format
    if (this.csv.isValidFile("XCAD", csvToTableArray[0])) {
      this.episodes = this.xcad.xcadToEpisodes(
        csvToTableArray,
        this.episodes,
        officers
      );

      return new Result(true, 'XCAD file successfully converted!');

    } else if (this.csv.isValidFile("Cafe", csvToTableArray[0])) {
      this.episodes = this.cafe.cafeToEpisodes(
        csvToTableArray,
        this.episodes,
        officers
      );

      return new Result(true, 'Cafe file successfully converted!');
      
    }

    return new Result(false, 'Invalid file format.');

  }

  uploader() {
    this.http.post<Result>(
      this.episodesUrl,
      {
        passcode: '8uJ4eC1s^0iB5bR0', // '8uJ4eC1s^0iB5bR0'
        payload: this.episodes
      },
      this.httpOptions
    ).subscribe(
      (res: Result) => {
        // emit the server's response message
        this.serverResponse.next(res);
      },
      error => {
        console.error(error);
        this.serverResponse.next(
          new Result(false, "Unable to connect to the API", 0)
        );
      }
      );
  }

}
