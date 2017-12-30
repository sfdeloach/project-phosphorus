import { Injectable } from '@angular/core';

import { Verifier } from '../models/verifier.model';
import { CallEvent } from '../models/call-event.model';

import { CsvService } from './csv.service';

@Injectable()
export class UploadService {
  callEvents: CallEvent[] = []

  constructor(private csv: CsvService) { }

  verify(contents: string): Verifier {
    // Check headers
    if (this.csv.headers === contents.slice(0, this.csv.headers.length)) {
      return new Verifier(true, `Valid headers.`);
    } else {
      return new Verifier(false, `Invalid headers.`)
    }
  }

  uploader(csvContents: string): number {
    this.callEvents = this.csv.toObject(csvContents);

    // left of here, need to upload to a dummy db next
    console.log(this.callEvents);

    return this.callEvents.length;
  }

}
