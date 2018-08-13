import { Injectable } from '@angular/core';
import { InitiatedDispo } from '../models/productivity-reports/initiated-dispo.model';
import { NonInitiated } from '../models/productivity-reports/non-initiated.model';
import { OverallInitiated } from '../models/productivity-reports/overall-initiated.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { buildInitiatedDispoReport } from '../services/functions/build.initiated.dispo.function';
import { buildNoninitiatedReport } from '../services/functions/build.noninitiated.function';
import { buildOverallInitiatedReport } from '../services/functions/build.overall.initiated.function';

@Injectable()
export class ReportService {
  includedOfcs: Officer[];
  episodes: Episode[];
  reportMetadata: ReportMetaData;
  ofcIDs: number[];

  constructor() {}

  buildReport(): InitiatedDispo[] | NonInitiated[] | OverallInitiated[] {
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
