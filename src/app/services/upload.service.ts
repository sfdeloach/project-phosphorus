import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';
import { Result } from '../models/result.model';

import { CsvService } from './csv.service';
import { XCADService } from './xcad.service';
import { CafeService } from './cafe.service';
import { EpisodeService } from './episode.http.service';

@Injectable()
export class UploadService {
  originalEpisodes: Episode[] = [];
  updatedEpisodes: Episode[] = [];
  //serverResponse: Subject<Result> = new Subject();
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
    if (this.csvService.isValidFile('XCAD', tableArray[0])) {
      this.updatedEpisodes = this.xcadService.xcadToEpisodes(
        tableArray,
        episodes,
        officers
      );
      return new Result(null, 'XCAD file successfully converted');
    } else if (this.csvService.isValidFile("Cafe", tableArray[0])) {
      this.updatedEpisodes = this.cafeService.cafeToEpisodes(
        tableArray,
        episodes,
        officers
      );
      return new Result(null, 'Cafe file successfully converted');
    }
    return new Result(new Error('Invalid file format.'));
  }

  uploader(originalEpisodes: Episode[]) {
    this.originalEpisodes = originalEpisodes;
    let episodeInsertGroup: Episode[] = [];

    this.updatedEpisodes.forEach((updatedEp, index) => {
      if (this.alreadyExists(updatedEp)) {
        const oldEpisode: string = JSON.stringify(this.getExisting(updatedEp));

        // update existing episode IF there is any change!
        if (oldEpisode !== JSON.stringify(updatedEp)) {
          console.dir('need to UPDATE');  // TODO: RAT
          this.episodeService.updateEpisode(updatedEp);
        }
      } else { // insert new episode
        episodeInsertGroup.push(updatedEp);
        if (episodeInsertGroup.length === 500 || this.isLastEpisode(index)) {
          console.dir('uploading to database...');  // TODO: RAT
          this.episodeService.insertEpisodes(episodeInsertGroup);
          episodeInsertGroup = [];
        }
      }
    });
  }

  // helper functions for this.uploader()

  alreadyExists(updatedEp: Episode): boolean {
    return this.originalEpisodes.find(originalEp => {
      return originalEp.call.eventNbr === updatedEp.call.eventNbr;
    }) ? true : false;
  }

  getExisting(updatedEp: Episode): Episode {
    return this.originalEpisodes.find(originalEp => {
      return originalEp.call.eventNbr === updatedEp.call.eventNbr;
    });
  }

  isLastEpisode(index: number): boolean {
    return this.updatedEpisodes.length === (index + 1);
  }

}
