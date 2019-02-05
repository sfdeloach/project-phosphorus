import { Officer } from '../models/officer.model';
import { Episode } from '../models/episode.model';
import { ReportMetaData } from '../models/productivity-reports/report.metadata.model';
import { DaysWorked } from '../models/productivity-reports/days-worked.model';
import { OfficerDaysWorkedCounter } from '../models/officer.days.worked.counter';

export function buildDaysWorkedReport(
  includedOfcs: Officer[],
  episodes: Episode[],
  reportMetadata: ReportMetaData,
  ofcIDs: number[]
): DaysWorked[] {
  const results: DaysWorked[] = [];
  includedOfcs.forEach(ofc => results.push(new DaysWorked(ofc)));

  const ofcs: OfficerDaysWorkedCounter[] = [];

  episodes.forEach(episode => {
    if (episode.call) {
      const created: Date = new Date(episode.call.created);
      const hhmm: number = created.getHours() * 100 + created.getMinutes();
      if (
        reportMetadata.startDate <= created &&
        created <= reportMetadata.endDate &&
        // TODO: check unit array instead?
        ofcIDs.includes(episode.call.primaryUnit) &&
        // is episode.call.created between 11:59 AM and 11:59 PM?
        (1159 <= hhmm && hhmm <= 2359)
      ) {
        // create new officer day counter if none exists
        if (!ofcs.find(ofc => ofc.ofcId === episode.call.primaryUnit)) {
          ofcs.push(new OfficerDaysWorkedCounter(episode.call.primaryUnit, []));
        }

        const index = ofcs.findIndex(ofc => ofc.ofcId === episode.call.primaryUnit);

        // only add date to dates array if it is unique and if the radioID
        // indicates the officer was logged in as a zone unit, i.e. 'AC16'
        if (
          !ofcs[index].dates.find(date => date === created.toDateString()) &&
          RegExp('[A-Z]').test(episode.call.radioID[1])
        ) {
          ofcs[index].dates.push(created.toDateString());
        }
      }
    }
  });

  ofcs.forEach(ofc => {
    const index = includedOfcs.findIndex(officer => officer.deptID === ofc.ofcId);
    results[index]['Days Worked'] = ofc.dates.length;
  });

  return results;
}
