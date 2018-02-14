import { Injectable } from '@angular/core';


import { Episode } from '../models/episode.model';
import { Call } from '../models/call.model';

@Injectable()
export class CsvService {
  public xcadHeaders: Array<string> = [
    "EventNbr", "Init_DateTime", "FinalEventType", "SourceCall", "BadgeNbr",
    "UnitId", "PrimaryUnit", "DispCode"
  ];

  public cafeHeaders: Array<string> = [
    'IncidentNbr', 'EventNbr', 'ReportDate', 'ReportType', 'OffenseNbr',
    'StatuteNbr', 'ChargeDescription', 'UcrCode', 'UcrDescription',
    'FelonyMisdemeanor', 'Clearance', 'ReportingOfficerNbr'
  ];

  constructor() { }

  /*  Converts a CSV string to a table array of strings, for example:
   *  [
   *    ["col1","col2","col3","col4","col5",...]
   *    ["col1","col2","col3","col4","col5",...]
   *    ["col1","col2","col3","col4","col5",...]
   *    ...
   *  ]
   */
  toTableArray(csv: string): Array<Array<string>> {
    // Remove any Windows-encoded line returns and convert the string to an array
    const csvCharArray: string[] = csv.replace(/[\r]/g, '').split('');

    // Create an empty array where each element will hold a CSV record/line
    let lineArray: string[] = [];
    let line: string = '';

    // Populate the lineArray
    csvCharArray.forEach(character => {
      if (character !== '\n') {
        line += character;
      } else {
        lineArray.push(line);
        line = '';
      }
    });

    // The final result will be an array of array of strings
    let result = [];

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
      result.push(valueArray);
    });

    return result;
  }
}
