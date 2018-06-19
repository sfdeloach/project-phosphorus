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
            [officer.deptID], // unit array
            primary === 1 ? officer.deptID : undefined,
            [disp]
          );
          this.episodes.push(new Episode(call));
        } else {
          console.log(`%c${eventNbr} is not new`, 'color: grey');
          const episode: Episode = this.getEpisode(eventNbr);
          const index: number = this.getEpisodeIndex(eventNbr);
          let updateNeeded = false;

          // update units array, primary, and disp array if necessary
          if (!this.wasOfficerAdded(officer, episode)) {
           episode.call.units.push(officer.deptID);
           updateNeeded = true;
          }

          if (primary === 1) {
            episode.call.primaryUnit = officer.deptID;
            updateNeeded = true;
          }

          if (!this.wasDispositionAdded(disp, episode)) {
            episode.call.disps.push(disp);
            updateNeeded = true;
          }

          if (updateNeeded) {
            this.episodes[index] = episode;
            console.log(`%cUpdate of ${episode.call.eventNbr} is needed`, 'color: blue');
          } else {
            console.log(`%cUpdate of ${episode.call.eventNbr} is not needed`, 'color: red');
          }
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
        return unit === ofc.deptID;
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
