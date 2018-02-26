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
    if (this.csvService.isValidFile("XCAD", tableArray[0])) {
      this.updatedEpisodes = this.xcadService.xcadToEpisodes(
        tableArray,
        episodes,
        officers
      );
      return new Result(true, 'XCAD file successfully converted!');
    } else if (this.csvService.isValidFile("Cafe", tableArray[0])) {
      this.updatedEpisodes = this.cafeService.cafeToEpisodes(
        tableArray,
        episodes,
        officers
      );
      return new Result(true, 'Cafe file successfully converted!');
    }
    return new Result(false, 'Invalid file format.');
  }

  uploader(originalEpisodes: Episode[]) {
    this.originalEpisodes = originalEpisodes;

    this.updatedEpisodes.forEach(updatedEp => {
      if (this.alreadyExists(updatedEp)) {
        const oldEpisode: string = JSON.stringify(this.getExisting(updatedEp));

        console.dir(`${updatedEp.call.eventNbr} already exists`);  // TODO: RAT
        // console.dir(`old:`);  // TODO: RAT
        // console.dir(this.getExisting(updatedEp));  // TODO: RAT
        // console.dir(`new:`);  // TODO: RAT
        // console.dir(updatedEp);  // TODO: RAT

        // update existing episode IF there is any change!
        if (oldEpisode !== JSON.stringify(updatedEp)) {
          console.dir(`need to UPDATE`);  // TODO: RAT
          this.episodeService.updateEpisode(updatedEp);
        } else { // TODO: RAT this else statement
          console.dir(`no need to update, episode unchanged`);  // TODO: RAT
        }

      } else { // insert new episode
        console.dir(`${updatedEp.call.eventNbr} does NOT exist`);  // TODO: RAT
        this.episodeService.insertEpisode(updatedEp);
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

}
