import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { OfficerService } from './officer.service';

import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';

@Injectable()
export class CafeService {

  constructor(
    private ofc: OfficerService
  ) { }

  cafeToEpisodes(
    array: Array<Array<string>>, episodes: Episode[], officers: Officer[]
  ): Episode[] {
    // Create an array of Episodes
    let result: Episode[] = episodes;

    // TODO: everything!

    return result;
  }

}
