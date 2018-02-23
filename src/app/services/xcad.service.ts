import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { OfficerService } from './officer.service';

import { Call } from '../models/call.model';
import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';

@Injectable()
export class XCADService {
  officers: Officer[];
  deptIDs: number[];

  constructor(
    private ofc: OfficerService
  ) { }

  setup(officers: Officer[]) {

    this.officers = officers;
    // Pull the current list of deptIDs that are of interest
    this.deptIDs = [];
    officers.forEach(officer => {
      this.deptIDs.push(officer.deptID);
    });

    console.log(this.deptIDs);
  }

  isIncludedOfficer(badgeNbr: string): boolean {
    return this.deptIDs.find(
      id => { return +badgeNbr.slice(2) === id; }
    ) ? true : false;
  }

  xcadToEpisodes(
    tableArray: Array<Array<string>>, episodes: Episode[], officers: Officer[]
  ): Episode[] {
    this.setup(officers);

    // Create an array of Episodes
    let result: Episode[] = episodes;

    // Remove the column names from the table array
    tableArray.splice(0,1);

    tableArray.forEach(record => {
      if (this.isIncludedOfficer(record[4])) {
        let call = new Call(
          +record[0].trim(),   // eventNbr: number
          new Date(record[1]), // created: Date
          record[2].trim(),    // eventType: string
          record[3].trim(),    // src: string
          [new Officer("", 100, {last: "Smith",first: "Todd"}, "SCU")],           // TODO: units: Officer[]
          undefined,           // TODO: primaryUnit: Officer
          [record[7]]          // disps: string[]
        );

        result.push(new Episode(call, []));
      }
    });

    return result;
  }

}
