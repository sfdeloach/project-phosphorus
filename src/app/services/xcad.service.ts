import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { OfficerService } from './officer.service';

import { Episode } from '../models/episode.model';
import { Call } from '../models/call.model';

@Injectable()
export class XCADService {

  constructor(
    private ofc: OfficerService
  ) { }

  xcadToEpisodes(array: Array<Array<string>>, episodes: Episode[]): Episode[] {
    // Create an array of Episodes
    let result: Episode[] = episodes;

    // Remove the column names from the table array
    array.splice(0,1);

    // Pull the current list of deptIDs that are of interest
    // TODO: left off here, how do I pull the list synchronously? use a series of callbacks?

    array.forEach(a => {
      let call = new Call(
        +a[0].trim(),   // eventNbr: number
        new Date(a[1]), // created: Date
        a[2].trim(),    // eventType: string
        a[3].trim(),    // src: string
        undefined,      // TODO: units: Officer[]
        undefined,      // TODO: primaryUnit: Officer
        [a[7]]          // disps: string[]
      );

      let episode = new Episode(call, []);
      result.push(episode);
    });

    return result;
  }

}
