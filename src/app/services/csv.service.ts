import { Injectable } from '@angular/core';
import { CallEvent } from '../models/call-event.model';

@Injectable()
export class CsvService {
  public headers: string = '"EventNbr","Init_DateTime","SourceCall","EventType","UnitId","OfcrName","CaseNbr","ClrOfficerBadge"\n';

  constructor() { }

  toObject(csv: string): CallEvent[] {
    // Note: this version of csv conversion is order dependent

    // Initialize some properties
    let csvCharArray: string[] = csv.split('');
    let line: string = '';

    // Step 1: Create an array of lines
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

    // Step 2: Create an array of arrays
    let arrayArray = [];

    // Process each element of the `lines` array
    lineArray.forEach(line => {
      let value: string = '';
      let valueArray: string[] = [];
      let charArray: string[] = line.split('');

      charArray.forEach((character, index) => {
        if (character === "," || index === (line.length - 1)) {
          valueArray.push(value);
          value = '';
        } else if (character === '"') {
          // Do nothing, this removes the quote from the string literal
        } else {
          value += character;
        }
      });
      arrayArray.push(valueArray);
    });

    // Step 3: Create an array of objects
    let objectArray: CallEvent[] = []

    arrayArray.forEach(array => {
      let callEvent = new CallEvent(
        Number.parseInt(array[0], 10),
        new Date(Date.parse(array[1])),
        array[2].trim(),
        array[3].trim(),
        array[4].trim(),
        { last: array[5].trim(), first: array[6].trim() },
        array[7].trim(),
        array[8].trim()
      );
      objectArray.push(callEvent);
    });

    return objectArray;
  }
}
