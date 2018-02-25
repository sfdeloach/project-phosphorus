import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';
import { Result } from '../models/result.model';

import { CsvService } from './csv.service';
import { CafeService } from './cafe.service';
import { XCADService } from './xcad.service';
import { EpisodeService } from './episode.service';

@Injectable()
export class UploadService {
  episodes: Episode[] = [];
  episodesUrl: string = 'http://localhost:3000/api/episodes';
  serverResponse: Subject<Result> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private csvService: CsvService,
    private xcadService: XCADService,
    private cafeService: CafeService,
    private episodeService: EpisodeService
  ) { }

  verify(fileContents: string, officers: Officer[], episodes: Episode[]): Result {
    // Convert line endings - Windows style ("\r\n") to Unix style ("\n")
    const tableArray = this.csvService.toTableArray(fileContents);

    // Convert CSV to a JavaScript object if the file is valid format
    if (this.csvService.isValidFile("XCAD", tableArray[0])) {
      this.episodes = this.xcadService.xcadToEpisodes(
        tableArray,
        episodes,
        officers
      );

      return new Result(true, 'XCAD file successfully converted!');

    } else if (this.csvService.isValidFile("Cafe", tableArray[0])) {
      this.episodes = this.cafeService.cafeToEpisodes(
        tableArray,
        episodes,
        officers
      );

      return new Result(true, 'Cafe file successfully converted!');
    }
    return new Result(false, 'Invalid file format.');
  }

  uploader() {
    this.episodeService.uploadEpisodes(this.episodes);
  }

}
