import { Injectable } from '@angular/core';

@Injectable()
export class CsvService {
  public cafeHeaders: Array<string> = [
    'IncidentNbr',
    'EventNbr',
    'ReportDate',
    'ReportType',
    'OffenseNbr',
    'StatuteNbr',
    'StatuteSection',
    'ChargeDescription',
    'UcrCode',
    'UcrDescription',
    'FelonyMisdemeanor',
    'Clearance',
    'ReportingOfficerNbr'
  ];

  public xcadHeaders: Array<string> = [
    'EventNbr',
    'Init_DateTime',
    'FinalEventType',
    'SourceCall',
    'BadgeNbr',
    'UnitId',
    'PrimaryUnit',
    'DispCode'
  ];

  constructor() {}

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

    // Populate the lineArray, remove newlines contained in quotes
    let inQuote = false;
    csvCharArray.forEach(character => {
      if (character === '"') {
        inQuote = !inQuote;
      }

      if (character === '\n' && !inQuote) {
        lineArray.push(line);
        line = '';
      } else if (character !== '\n') {
        line += character;
      }

      // if (character !== '\n') {
      //   line += character;
      // } else if (inQuote) {
      //   // intentionally left blank
      // } else {
      //   lineArray.push(line);
      //   line = '';
      // }
    });

    // The final result will be an array of array of strings
    const result = [];

    // Process each element of the `lines` array
    lineArray.forEach(element => {
      let value = '';
      const valueArray: string[] = [];
      const charArray: string[] = element.split('');
      let insideQuotes = false;

      charArray.forEach((character, index) => {
        if (!insideQuotes && character === ',') {
          valueArray.push(value);
          value = '';
        } else if (character === '"') {
          insideQuotes = !insideQuotes;
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
