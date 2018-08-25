import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { InitiatedDispo } from '../models/productivity-reports/initiated-dispo.model';
import { isFound } from './isfound.function';

export function buildInitiatedDispoReport(
  includedOfcs: Officer[],
  episodes: Episode[],
  reportMetadata: ReportMetaData
): InitiatedDispo[] {
  const results: InitiatedDispo[] = [];

  includedOfcs.forEach(ofc => results.push(new InitiatedDispo(ofc)));

  episodes.forEach(episode => {
    // First conditional only looks at episodes with call information, i.e.
    // UTTs will not be found in this first block of code
    if (
      episode.reports &&
      episode.call &&
      reportMetadata.startDate <= new Date(episode.call.created) &&
      new Date(episode.call.created) <= reportMetadata.endDate
    ) {
      episode.reports.forEach(report => {
        const index = results.findIndex(result => result.officer.deptID === report.reportingOfc);

        if (index !== -1) {
          let statCounter = 0;

          if (
            isFound(report.offenses, 'ucrCode', ['5400']) &&
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
            if (isFound(report.offenses, 'ncicLevel', ['F'])) {
              ++results[index]['Felony'];
              statCounter++;
            } else {
              ++results[index]['Misdemeanor'];
              statCounter++;
            }
          }

          if (isFound(report.offenses, 'ucrCode', ['6001'])) {
            // TODO: Research any other ucrCodes that may apply to a warrant
            ++results[index]['Warrant'];
            statCounter++;
          }

          if (episode.call.src === 'ONV' && report.type !== 'OR') {
            ++results[index]['Reports'];
            statCounter++;
          }

          if (episode.call.src === 'ONV' && statCounter < 1) {
            report.offenses.forEach(offense => {
              console.warn(`ONV report ${report.caseNbr}-${offense.statuteDesc} was NEVER counted`);
            });
          }
        }
      });
      // This next block will look for UTT stats
    } else if (
      !episode.call &&
      episode.reports &&
      reportMetadata.startDate <= new Date(episode.reports[0].reportDate) &&
      new Date(episode.reports[0].reportDate) <= reportMetadata.endDate
    ) {
      episode.reports.forEach(report => {
        const index = results.findIndex(result => result.officer.deptID === report.reportingOfc);

        if (index !== -1) {
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

  results.forEach(result => {
    // Sum the total arrests
    result['Total Arrests'] =
      result['Felony'] + result['Misdemeanor'] + result['DUI'] + result['Warrant'];

    // Calculate performance rating
    result['Rating'] = Number(
      (
        0.1 * result['Felony'] +
        0.06 * result['Misdemeanor'] +
        0.09 * result['DUI'] +
        0.04 * result['Warrant'] +
        0.03 * result['Reports'] +
        0.03 * result['Criminal UTTs'] +
        0.02 * result['UTTs'] +
        0.01 * result['Warnings']
      ).toFixed(1)
    );
  });

  return results;
}