import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';
import { Report } from '../models/report.model';
import { Offense } from '../models/offense.model';
import { Call } from '../models/call.model';

@Injectable()
export class CafeService {
  episodes: Episode[];
  officers: Officer[];
  verbose = false; // used for debugging

  constructor() {}

  addCafeData(
    episodes: Episode[],
    cafeArray: Array<Array<string>>,
    officers: Officer[]
  ) {
    if (this.verbose) {
      console.log(
        '%c*** Cafe service verbose setting is on ***',
        'color: blue'
      );
    }

    this.episodes = episodes;
    this.officers = officers;

    cafeArray.slice(1).forEach(row => {
      if (this.verbose) {
        console.log(`--> Looking for event no. ${row[1]}`);
      }

      const episodeIndex = this.getEpisodeIndex(+row[1]);

      if (this.verbose && episodeIndex !== -1) {
        console.log(`%c${row[1]} is at index ${episodeIndex}`, 'color: blue');
      }
      if (this.verbose && episodeIndex === -1) {
        console.log(`%cCannot find an episode for ${row[0]}`, 'color: red');
      }

      if (episodeIndex === -1) {
        const report = this.createReport(row);
        this.episodes.push(new Episode(undefined, [report]));
      } else if (this.newReport(row[0], episodeIndex)) {
        if (this.verbose) {
          console.log('%cNew report detected: ' + row[0], 'color: green');
        }
        const report = this.createReport(row);
        this.episodes[episodeIndex].reports.push(report);
      } else {
        if (this.verbose) {
          console.log('%cOld report detected: ' + row[0], 'color: orange');
        }
        const offense = new Offense(
          +row[4],
          row[5],
          row[6],
          row[7],
          row[8],
          row[9]
        );
        this.addNewOffense(row[0], offense, episodeIndex);
      }
    });

    if (this.verbose) {
      console.log(this.episodes);
    }

    return this.episodes;
  }

  // helper functions

  createReport(row: string[]): Report {
    return new Report(
      row[0],
      new Date(row[2]),
      row[3],
      [new Offense(+row[4], row[5], row[6], row[7], row[8], row[9])],
      row[10],
      +row[11]
    );
  }

  newReport(caseNumber: string, episodeIndex: number): boolean {
    if (!this.episodes[episodeIndex].reports) {
      if (this.verbose) {
        console.log(`%c${caseNumber} is a new report`, 'color: green');
      }
      this.episodes[episodeIndex].reports = [];
      return true;
    }
    return this.episodes[episodeIndex].reports.find(report => {
      return report.caseNbr === caseNumber;
    })
      ? false
      : true;
  }

  addNewOffense(caseNumber: string, offense: Offense, episodeIndex: number) {
    const reportIndex = this.episodes[episodeIndex].reports.findIndex(
      report => {
        return report.caseNbr === caseNumber;
      }
    );
    this.episodes[episodeIndex].reports[reportIndex].offenses.push(offense);
  }

  getEpisodeIndex(eventNbr: number): number {
    if (eventNbr === 0) {
      return -1;
    }
    return this.episodes.findIndex(episode => {
      if (episode.call) {
        return episode.call.eventNbr === eventNbr;
      }
    });
  }
}

// row reference table

// 0  IncidentNbr
// 1  EventNbr
// 2  ReportDate
// 3  ReportType
// 4  OffenseNbr
// 5  StatuteNbr
// 6  ChargeDescription
// 7  UcrCode
// 8  UcrDescription
// 9  FelonyMisdemeanor
// 10 Clearance
// 11 ReportingOfficerNbr
