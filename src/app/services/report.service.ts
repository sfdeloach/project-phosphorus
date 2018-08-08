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

  constructor() { }

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
  // public 'Reports': number;
  // public 'Criminal UTTs': number;
  // public 'UTTs': number;
  // public 'Warnings': number;

  buildInitiatedDispoReport(): InitiatedDispo[] {
    const results: InitiatedDispo[] = [];

    this.includedOfcs.forEach(ofc => results.push(new InitiatedDispo(ofc)));

    this.episodes.forEach(episode => {
      // First conditional only looks at episodes with call information, i.e.
      // UTTs will not be found in this first block of code
      if (
        episode.reports &&
        episode.call &&
        this.reportMetadata.startDate <= new Date(episode.call.created) &&
        new Date(episode.call.created) <= this.reportMetadata.endDate
      ) {
        episode.reports.forEach(report => {
          const index = results.findIndex(
            result => result.officer.deptID === report.reportingOfc
          );

          if (index > 0) {
            let statCounter = 0;

            if (
              this.isFound(report.offenses, 'ucrCode', ['5400']) &&
              (report.clearance === 'Cleared By Arrest' ||
                report.clearance === 'Transferred to SAO (Capias)')
            ) {
              ++results[index]['DUI'];
              statCounter++;
            }

            if (
              episode.call.src === 'ONV' &&
              report.type === 'OR' &&
              (report.clearance === 'Cleared By Arrest' ||
                report.clearance === 'Transferred to SAO (Capias)')
            ) {
              if (this.isFound(report.offenses, 'ncicLevel', ['F'])) {
                ++results[index]['Felony'];
                statCounter++;
              } else {
                ++results[index]['Misdemeanor'];
                statCounter++;
              }
            }

            if (this.isFound(report.offenses, 'ucrCode', ['6001'])) {
              // TODO: Research any other ucrCodes that may apply to a warrant
              ++results[index]['Warrant'];
              statCounter++;
            }

            if (episode.call.src === 'ONV' && report.type !== 'OR') {
              ++results[index]['Reports'];
              statCounter++;
            }

            if (episode.call.src === 'ONV' && statCounter < 1) {
              report.offenses.forEach((offense) => {
                console.warn(`ONV report ${report.caseNbr}-${offense.statuteDesc} was NEVER counted`);
              });
            }
          }
        });
        // This next block will look for UTT stats
      } else if (
        !episode.call &&
        episode.reports &&
        this.reportMetadata.startDate <= new Date(episode.reports[0].reportDate) &&
        new Date(episode.reports[0].reportDate) <= this.reportMetadata.endDate
      ) {
        episode.reports.forEach(report => {
          const index = results.findIndex(
            result => result.officer.deptID === report.reportingOfc
          );

          if (index > 0) {
            let statCounter = 0;

            if (report.type === 'TC') {
              report.offenses.forEach(offense => {
                if (report.clearance === 'Cleared By Arrest' && offense.ucrCode === '7100') {
                  ++results[index]['Criminal UTTs'];
                  statCounter++;
                } else if (report.clearance !== 'Cleared By Arrest' && offense.ucrCode === '7100') {
                  ++results[index]['UTTs'];
                  statCounter++;
                } else if (offense.ucrCode === '7200') {
                  ++results[index]['Warnings'];
                  statCounter++;
                } else {
                  console.warn(`TC report ${report.caseNbr} was NEVER counted`);
                }
              });
            } else {
              console.warn(episode.reports[0].caseNbr + ' was not counted');
            }
          }
        });
      }
    });

    // Sum the total arrests
    results.forEach(result => {
      result['Total Arrests'] =
        result['Felony'] +
        result['Misdemeanor'] +
        result['DUI'] +
        result['Warrant'];
    });

    // TODO: create new property in model 'Score' that provides an aggregate
    //       score for all properties listed in the model

    return results;
  }

  // searches an array of objects for a key containing
  // any value found in the value array
  isFound(array: any[], key: string, values: string[]): boolean {
    let result = false;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (array[i][key] === values[j]) {
          result = true;
          break;
        }
      }
      if (result) {
        break;
      }
    }
    return result;
  }

  buildNonInitiatedReport(): NonInitiated[] {
    const results: NonInitiated[] = [];

    this.includedOfcs.forEach(ofc => results.push(new NonInitiated(ofc)));

    // TODO!

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
