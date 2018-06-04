import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Episode } from '../models/episode.model';
import { Officer } from '../models/officer.model';
import { Message } from '../models/message.model';

import { CsvService } from './csv.service';
import { XCADService } from './xcad.service';
import { CafeService } from './cafe.service';
import { EpisodeHttpService } from './episode.http.service';

@Injectable()
export class UploadService {
  episodes: Episode[] = [];
  message: Subject<Message> = new Subject();

  constructor(
    private csvService: CsvService,
    private xcadService: XCADService,
    private cafeService: CafeService,
    private episodeHttpService: EpisodeHttpService
  ) { }

  upload(fileContents: string, officers: Officer[]) {
    const tableArray = this.csvService.toTableArray(fileContents);

    if (this.csvService.isValidFile('XCAD', tableArray[0])) {
      this.episodes = this.xcadService.xcadToEpisodes(tableArray, officers);
      this.episodeHttpService.insertEpisodes(this.episodes);
    } else if (this.csvService.isValidFile('Cafe', tableArray[0])) {
      // TODO!
    } else {
      this.message.next(new Message(null, 'File is not a valid format'));
    }
  }
}
