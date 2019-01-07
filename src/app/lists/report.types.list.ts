import { Injectable } from '@angular/core';

@Injectable()
export class ReportTypesList {
  get reportTypes(): string[] {
    const reports = [
      'Overall Initiated',
      'Initiated w/ Disposition',
      'Non-initiated',
      'Days Worked'
    ];
    return reports;
  }
}
