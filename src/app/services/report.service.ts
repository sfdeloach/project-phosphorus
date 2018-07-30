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

  // public 'Felony': number;
  // public 'Misdemeanor': number;
  // public 'DUI': number;
  // public 'Warrant': number;
  // public 'Capias': number;
  // public 'Reports': number;
  // public 'Criminal UTTs': number;
  // public 'UTTs': number;
  // public 'Warnings': number;

  buildInitiatedDispoReport(): InitiatedDispo[] {
    const results: InitiatedDispo[] = [];

    this.includedOfcs.forEach(ofc => results.push(new InitiatedDispo(ofc)));

    this.episodes.forEach(episode => {
      // First conditional only looks at episodes with call information, i.e.
      // UTTs will be found in this first block
      // TODO: what about warrants??? CJIS ucrCode: '6001'
      if (
        episode.call &&
        this.reportMetadata.startDate <= new Date(episode.call.created) &&
        new Date(episode.call.created) <= this.reportMetadata.endDate &&
        this.ofcIDs.includes(episode.call.primaryUnit)
      ) {
        if (
          episode.reports &&
          episode.call.src === 'ONV' &&
          this.isFound(episode.reports, 'type', 'OR', 'CJ') &&
          this.isFound(
            episode.reports,
            'clearance',
            'Cleared By Arrest',
            'Transferred to Other Agency',
            'Transferred to SAO (Capias)'
          )
        ) {
          episode.reports.forEach(report => {
            if (
              (report.type === 'OR' || report.type === 'CJ') &&
              (report.clearance === 'Cleared By Arrest' ||
                report.clearance === 'Transferred to Other Agency')
            ) {
              // Test print
              if (report.type === 'CJ') {
                console.log(report);
              }

              if (this.isFound(report.offenses, 'ncicLevel', 'F')) {
                const index = results.findIndex(
                  result => result.officer.deptID === report.reportingOfc
                );
                if (index > 0) {
                  ++results[index]['Felony'];
                }
              } else if (this.isFound(report.offenses, 'ncicLevel', 'M', 'N')) {
                const index = results.findIndex(
                  result => result.officer.deptID === report.reportingOfc
                );
                if (index > 0) {
                  ++results[index]['Misdemeanor'];
                }
              } else {
                console.log(report); // TODO RAT
              }
            }
          });
        }
      }
    });

    return results;
  }

  isFound(
    array: any[],
    key: string,
    value1: any,
    value2?: any,
    value3?: any
  ): boolean {
    let result = false;
    array.forEach(element => {
      if (
        element[key] === value1 ||
        element[key] === value2 ||
        element[key] === value3
      ) {
        result = true;
      }
    });
    return result;
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
