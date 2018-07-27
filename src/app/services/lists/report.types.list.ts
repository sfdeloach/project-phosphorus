import { Injectable } from '@angular/core';

@Injectable()
export class ReportTypesList {
  get reportTypes(): string[] {
    return ['Operations', 'CSO', 'CIS', 'Traffic', 'Uptown'];
  }
}
