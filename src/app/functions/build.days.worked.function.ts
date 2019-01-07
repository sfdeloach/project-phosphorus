import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { DaysWorked } from '../models/productivity-reports/days-worked.model';

export function buildDaysWorkedReport(
  includedOfcs: Officer[],
  episodes: Episode[],
  reportMetadata: ReportMetaData,
  ofcIDs: number[]
): DaysWorked[] {
  const results: DaysWorked[] = [];
  includedOfcs.forEach(ofc => results.push(new DaysWorked(ofc)));

  console.log(episodes); // TODO: RAT

  // TODO: expand as an object { ofcId: xxx, dates: [xxx] },
  // where a length of dates array provides days worked
  const ofcs: number[] = [];

  episodes.forEach(episode => {
    if (episode.call) {
      const created: Date = new Date(episode.call.created);
      if (
        reportMetadata.startDate <= created &&
        created <= reportMetadata.endDate &&
        // TODO: check unit array instead?
        ofcIDs.includes(episode.call.primaryUnit)
        // is episode.call.created between 11:00 AM and 11:59 PM?
      ) {
        console.log(created.toTimeString());
      }
    }
  });
  console.log(ofcs); // RAT

  return results;
}
