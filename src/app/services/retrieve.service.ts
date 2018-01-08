import { Injectable } from '@angular/core';

import { CallEvent } from '../models/call-event.model';

@Injectable()
export class RetrieveService {

  constructor(

  ) { }

  // Return the number of documents currently in the events db
  getCount(): number {

    return 0;
  }

  // Return the document with the lowest event number
  getFirst(): CallEvent {

    return new CallEvent('a', 'b', 0, 'd', new Date(), { last: 'a', first: 'b' }, 'g', 'h');
  }

  // Return the document with the highest event number
  getLast(): CallEvent {

    return new CallEvent('a', 'b', 0, 'd', new Date(), { last: 'a', first: 'b' }, 'g', 'h');
  }

}
