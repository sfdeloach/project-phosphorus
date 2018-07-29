import { Injectable } from '@angular/core';

@Injectable()
export class ReportTypesList {
  get reportTypes(): string[] {
    return ['Overall Initiated', 'Initiated w/ Disposition', 'Non-initiated'];
  }
}
