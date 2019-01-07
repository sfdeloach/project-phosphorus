import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { OverallInitiated } from '../models/productivity-reports/overall-initiated.model';
import { allowedInitiatedEvts } from './allowed.initiated.events.function';

export function buildOverallInitiatedReport(
  includedOfcs: Officer[],
  episodes: Episode[],
  reportMetadata: ReportMetaData,
  ofcIDs: number[]
): OverallInitiated[] {
  const results: OverallInitiated[] = [];
  includedOfcs.forEach(ofc => results.push(new OverallInitiated(ofc)));

  episodes.forEach(episode => {
    if (
      episode.call &&
      reportMetadata.startDate <= new Date(episode.call.created) &&
      new Date(episode.call.created) <= reportMetadata.endDate &&
      ofcIDs.includes(episode.call.primaryUnit)
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
          allowedInitiatedEvts().includes(episode.call.eventType.slice(0, 2))) &&
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

  results.forEach(result => {
    // Calculate performance rating
    result['Rating'] = Number(
      (
        0.04 * result['On View'] +
        0.06 * result['On View w/ Report'] +
        0.03 * result['Traffic Stops']
      ).toFixed(1)
    );
  });

  return results;
}
