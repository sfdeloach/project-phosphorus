import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';

@Injectable()
export class CafeService {

  constructor() { }

  cafeToEpisodes(
    array: Array<Array<string>>, episodes: Episode[], officers: Officer[]
  ): Episode[] {
    // Create an array of Episodes
    const result: Episode[] = episodes;

    // TODO: complete this service!

    return result;
  }

}
