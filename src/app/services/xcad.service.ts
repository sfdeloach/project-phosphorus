import { Injectable } from '@angular/core';

import { Call } from '../models/call.model';
import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';

@Injectable()
export class XCADService {
  episodes: Episode[];
  officers: Officer[];
  deptIDs: number[];

  constructor() { }

  xcadToEpisodes(
    tableArray: Array<Array<string>>, officers: Officer[]
  ): Episode[] {

    // initialize properties and create an updated department ID list
    this.setup(officers);

    // Remove column headers then process the table
    tableArray.splice(0, 1);
    tableArray.forEach(record => {
      // trim the leading 'A0' from the table
      const deptID: number = +record[4].trim().slice(2);

      const officer: Officer = this.officerExists(deptID) ?
        this.getOfficer(deptID) : undefined;

      if (!officer) {
        console.log(`%c! dept ID ${deptID} is not recognized`, 'color: orange');
      } else {
        console.log(`%cdept ID ${deptID} is ` +
          `${officer.name.first[0]}. ${officer.name.last}`, 'color: grey');
        const eventNbr: number = +record[0].trim();
        const created: Date = new Date(record[1]);
        const eventType: string = record[2].trim();
        const src: string = record[3].trim();
        const primary: number = +record[6].trim();
        const disp: string = record[7].trim();

        if (this.isNewEpisode(eventNbr)) {
          console.log(`%c* ${eventNbr} is new`, 'color: green');
          const call: Call = new Call(
            eventNbr,
            created,
            eventType,
            src,
            [officer], // unit array
            primary === 1 ? officer : undefined,
            [disp]
          );
          this.episodes.push(new Episode(call));
        } else {
          console.log(`%c${eventNbr} is not new`, 'color: grey');
          const existingEpisode: Episode = this.getEpisode(eventNbr);
          const existingEpisodeIndex: number = this.getEpisodeIndex(eventNbr);

          // update units array, primary, and disp array if necessary
          if (!this.wasOfficerAdded(officer, existingEpisode)) {
            existingEpisode.call.units.push(officer);
          }

          if (primary === 1) {
            existingEpisode.call.primaryUnit = officer;
          }

          if (!this.wasDispositionAdded(disp, existingEpisode)) {
            existingEpisode.call.disps.push(disp);
          }

          // replace the old episode with the updated version
          this.episodes[existingEpisodeIndex] = existingEpisode;
        }
      }
    });

    return this.episodes;
  }

  // helper functions //////////////////////////////////////////////////////////
  setup(officers: Officer[]) {
    this.officers = officers;
    this.deptIDs = [];
    this.episodes = [];
    officers.forEach(officer => {
      this.deptIDs.push(officer.deptID); // current list of deptIDs
    });
  }

  isNewEpisode(eventNbr: number): boolean {
    return this.episodes.find(
      episode => {
        return episode.call.eventNbr === eventNbr;
      }
    ) ? false : true;
  }

  officerExists(deptID: number): boolean {
    return this.officers.find(
      officer => {
        return officer.deptID === deptID;
      }
    ) ? true : false;
  }

  getOfficer(deptID: number): Officer {
    return this.officers.find(
      officer => {
        return officer.deptID === deptID;
      }
    );
  }

  getEpisode(eventNbr: number): Episode {
    return this.episodes.find(
      episode => {
        return episode.call.eventNbr === eventNbr;
      }
    );
  }

  getEpisodeIndex(eventNbr: number): number {
    return this.episodes.findIndex(
      episode => {
        return episode.call.eventNbr === eventNbr;
      }
    );
  }

  wasOfficerAdded(ofc: Officer, episode: Episode): boolean {
    return episode.call.units.find(
      unit => {
        return unit === ofc;
      }
    ) ? true : false;
  }

  wasDispositionAdded(disposition: string, episode: Episode): boolean {
    return episode.call.disps.find(
      disp => {
        return disp === disposition;
      }
    ) ? true : false;
  }

}
