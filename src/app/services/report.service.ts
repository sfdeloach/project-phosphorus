import { Injectable } from '@angular/core';
import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';

import { InitiatedDispo } from '../models/productivity-reports/initiated-dispo.model';
import { NonInitiated } from '../models/productivity-reports/non-initiated.model';
import { OverallInitiated } from '../models/productivity-reports/overall-initiated.model';
import { DaysWorked } from '../models/productivity-reports/days-worked.model';

import { buildInitiatedDispoReport } from '../functions/build.initiated.dispo.function';
import { buildNoninitiatedReport } from '../functions/build.noninitiated.function';
import { buildOverallInitiatedReport } from '../functions/build.overall.initiated.function';
import { buildDaysWorkedReport } from '../functions/build.days.worked.function';

@Injectable()
export class ReportService {
  includedOfcs: Officer[];
  episodes: Episode[];
  reportMetadata: ReportMetaData;
  ofcIDs: number[];

  constructor() {}

  buildReport(): InitiatedDispo[] | NonInitiated[] | OverallInitiated[] | DaysWorked[] {
    this.ofcIDs = this.includedOfcs.map(ofc => ofc.deptID);

    if (this.reportMetadata) {
      switch (this.reportMetadata.reportType) {
        case 'Initiated w/ Disposition':
          return buildInitiatedDispoReport(this.includedOfcs, this.episodes, this.reportMetadata);
        case 'Non-initiated':
          return buildNoninitiatedReport(this.includedOfcs, this.episodes, this.reportMetadata);
        case 'Overall Initiated':
          return buildOverallInitiatedReport(
            this.includedOfcs,
            this.episodes,
            this.reportMetadata,
            this.ofcIDs
          );
        case 'Days Worked':
          return buildDaysWorkedReport(
            this.includedOfcs,
            this.episodes,
            this.reportMetadata,
            this.ofcIDs
          );
        default:
          console.error('No report selected to build');
          return [];
      }
    } else {
      console.error('No metadata for the report exists');
      return [];
    }
  }
}
