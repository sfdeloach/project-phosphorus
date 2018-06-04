import { Injectable } from '@angular/core';


import { Episode } from '../models/episode.model';
import { Call } from '../models/call.model';
import { Element } from '@angular/compiler';

@Injectable()
export class CsvService {
  public cafeHeaders: Array<string> = [
    'IncidentNbr', 'EventNbr', 'ReportDate', 'ReportType', 'OffenseNbr',
    'StatuteNbr', 'ChargeDescription', 'UcrCode', 'UcrDescription',
    'FelonyMisdemeanor', 'Clearance', 'ReportingOfficerNbr'
  ];

  public xcadHeaders: Array<string> = [
    'EventNbr', 'Init_DateTime', 'FinalEventType', 'SourceCall', 'BadgeNbr',
    'UnitId', 'PrimaryUnit', 'DispCode'
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
    const lineArray: string[] = [];
    let line = '';

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
    const result = [];

    // Process each element of the `lines` array
    lineArray.forEach(element => {
      let value = '';
      const valueArray: string[] = [];
      const charArray: string[] = element.split('');

      charArray.forEach((character, index) => {
        if (character === ',') {
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

  isValidFile(fileType: string, headers: Array<string>): boolean {
    let i = 0;
    let result = true;
    let fileHeaders;

    if (fileType === 'XCAD') {
      fileHeaders = this.xcadHeaders;
    } else if (fileType === 'Cafe') {
      fileHeaders = this.cafeHeaders;
    } else {
      return false;
    }

    headers.forEach(header => {
      if (header !== fileHeaders[i++]) {
        result = false;
      }
    });
    return result;
  }

}
