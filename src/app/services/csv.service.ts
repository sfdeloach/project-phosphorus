import { Injectable } from '@angular/core';

import { Episode } from '../models/episode.model';
import { Call } from '../models/call.model';

@Injectable()
export class CsvService {
  public headers: string = 'EventNbr,Init_DateTime,FinalEventType,SourceCall,'
                         + 'BadgeNbr,UnitId,PrimaryUnit,DispCode\n';

  constructor() { }

  /*
   *  Note: this conversion of csv to json is column-order dependent
   *  TODO: generalize this function so that it receives a string and returns
   *        an array of arrays...create other functions that take this function's
   *        return value and create the actual JSON object
   */
  toObject(csv: string): Episode[] {

    // Initialize some properties
    let csvCharArray: string[] = csv.split('');
    let line: string = '';

    // Create an array of lines
    let lineArray: string[] = [];

    // Create an array where each line is an element
    csvCharArray.forEach(character => {
      if (character !== '\n') {
        line += character;
      } else {
        lineArray.push(line);
        line = '';
      }
    });

    // Remove the headers from the array
    lineArray.splice(0, 1);

    // Create an array of arrays
    let arrayArray = [];

    // Process each element of the `lines` array
    lineArray.forEach(line => {
      let value: string = '';
      let valueArray: string[] = [];
      let charArray: string[] = line.split('');

      charArray.forEach((character, index) => {
        if (character === ",") {
          valueArray.push(value);
          value = '';
        } else if (character === '"') {
          // Do nothing, this removes the quote from the string literal
        } else if (index === charArray.length - 1) {
          value += character;
          valueArray.push(value);
        } else {
          value += character;
        }
      });
      arrayArray.push(valueArray);
    });

    // Create an array of objects
    let objectArray: Episode[] = [];

    arrayArray.forEach(a => {
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
      objectArray.push(episode);
    });

    return objectArray;
  }

}
