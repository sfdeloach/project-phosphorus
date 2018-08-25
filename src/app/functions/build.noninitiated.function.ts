import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { NonInitiated } from '../models/productivity-reports/non-initiated.model';

export function buildNoninitiatedReport(
  includedOfcs: Officer[],
  episodes: Episode[],
  reportMetadata: ReportMetaData
): NonInitiated[] {
  const results: NonInitiated[] = [];

  includedOfcs.forEach(ofc => results.push(new NonInitiated(ofc)));

  episodes.forEach(episode => {
    if (
      episode.reports &&
      episode.call &&
      episode.call.src !== 'ONV' &&
      reportMetadata.startDate <= new Date(episode.call.created) &&
      new Date(episode.call.created) <= reportMetadata.endDate
    ) {
      const callIndex = results.findIndex(
        result => result.officer.deptID === episode.call.primaryUnit
      );

      if (callIndex !== -1) {
        ++results[callIndex]['Calls'];
      }

      episode.reports.forEach(report => {
        const reportIndex = results.findIndex(
          result => result.officer.deptID === report.reportingOfc
        );

        if (reportIndex !== -1) {
          if (report.clearance === 'Cleared By Arrest') {
            ++results[reportIndex]['Arrests'];
          }

          if (report.type === 'TA') {
            ++results[reportIndex]['Crashes'];
          } else if (report.type === 'OR') {
            ++results[reportIndex]['Offense'];
          } else {
            ++results[reportIndex]['Non-Offense'];
          }
        }
      });
    }
  });

  results.forEach(result => {
    // Calculate performance rating
    result['Rating'] = Number(
      (
        0.08 * result['Arrests'] +
        0.05 * result['Offense'] +
        0.03 * result['Non-Offense'] +
        0.02 * result['Crashes'] +
        0.01 * result['Calls']
      ).toFixed(1)
    );
  });

  return results;
}
