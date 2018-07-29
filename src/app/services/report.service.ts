import { Injectable } from '@angular/core';
import { InitiatedDispo } from '../models/productivity-reports/initiated-dispo.model';
import { NonInitiated } from '../models/productivity-reports/non-initiated.model';
import { OverallInitiated } from '../models/productivity-reports/overall-initiated.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { allowedInitiatedEvts } from '../services/functions/allowed.initiated.events.function';

@Injectable()
export class ReportService {
  reportMetadata: ReportMetaData;
  includedOfcs: Officer[];
  ofcIDs: number[];
  episodes: Episode[];

  constructor() {}

  buildReport(): InitiatedDispo[] | NonInitiated[] | OverallInitiated[] {
    this.ofcIDs = this.includedOfcs.map(ofc => ofc.deptID);

    if (this.reportMetadata) {
      switch (this.reportMetadata.reportType) {
        case 'Initiated w/ Disposition':
          return this.buildInitiatedDispoReport();
        case 'Non-initiated':
          return this.buildNonInitiatedReport();
        case 'Overall Initiated':
          return this.buildOverallInitiatedReport();
        default:
          console.error('No report selected to build');
          return [];
      }
    } else {
      console.error('No metadata for the report exists');
      return [];
    }
  }

  buildInitiatedDispoReport(): InitiatedDispo[] {
    const results: InitiatedDispo[] = [];

    this.includedOfcs.forEach(ofc => results.push(new InitiatedDispo(ofc)));

    this.episodes.forEach(episode => {
      // TODO
    });

    return results;
  }

  buildNonInitiatedReport(): NonInitiated[] {
    const results: NonInitiated[] = [];

    this.includedOfcs.forEach(ofc => results.push(new NonInitiated(ofc)));

    this.episodes.forEach(episode => {
      // TODO
    });

    return results;
  }

  buildOverallInitiatedReport(): OverallInitiated[] {
    const results: OverallInitiated[] = [];

    this.includedOfcs.forEach(ofc => results.push(new OverallInitiated(ofc)));

    this.episodes.forEach(episode => {
      if (
        episode.call &&
        this.reportMetadata.startDate <= new Date(episode.call.created) &&
        new Date(episode.call.created) <= this.reportMetadata.endDate &&
        this.ofcIDs.includes(episode.call.primaryUnit)
      ) {
        // On view calls from a certain list
        if (
          episode.call.src === 'ONV' &&
          (episode.call.eventType === 'VEH' ||
            allowedInitiatedEvts().includes(episode.call.eventType.slice(0, 2)))
        ) {
          const index = results.findIndex(
            result => result.officer.deptID === episode.call.primaryUnit
          );
          ++results[index]['On View'];
        }
        // On view calls with a report
        if (
          episode.call.src === 'ONV' &&
          (episode.call.eventType === 'VEH' ||
            allowedInitiatedEvts().includes(
              episode.call.eventType.slice(0, 2)
            )) &&
          episode.reports
        ) {
          const index = results.findIndex(
            result => result.officer.deptID === episode.call.primaryUnit
          );
          ++results[index]['On View w/ Report'];
        }
        // Traffic stops
        if (episode.call.eventType === 'VEH') {
          const index = results.findIndex(
            result => result.officer.deptID === episode.call.primaryUnit
          );
          ++results[index]['Traffic Stops'];
        }
      }
    });

    return results;
  }
}
