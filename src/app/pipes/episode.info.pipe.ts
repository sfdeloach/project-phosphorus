import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/episode.model';

@Pipe({ name: 'episodeInfo' })
export class EpisodeInfoPipe implements PipeTransform {
  transform(episodes: Episode[], flag: string): Episode[] {
    const call: Episode[] = [];
    const report: Episode[] = [];
    const both: Episode[] = [];
    const empty: Episode[] = [];
    const duplicates: Episode[] = [];

    episodes.forEach(episode => {
      if (flag === 'calls-only' && episode.call && !episode.reports) {
        call.push(episode);
      } else if (flag === 'reports-only' && !episode.call && episode.reports) {
        report.push(episode);
      } else if (flag === 'calls-and-reports' && episode.call && episode.reports) {
        both.push(episode);
      } else if (flag === 'empty-episodes' && !episode.call && !episode.reports) {
        empty.push(episode);
      }
    });

    if (flag === 'duplicate-episodes') {
      episodes.forEach((episode, index, array) => {
        const shallowArray = array.slice();
        shallowArray.splice(index, 1);

        let found;

        if (episode.call) {
          found = shallowArray.find(element => {
            if (element.call) {
              return element.call.eventNbr === episode.call.eventNbr;
            }
          });
        }

        if (found) {
          duplicates.push(episode);
        }
      });
    }

    switch (flag) {
      case 'calls-only':
        return call;
      case 'reports-only':
        return report;
      case 'calls-and-reports':
        return both;
      case 'empty-episodes':
        return empty;
      case 'duplicate-episodes':
        return duplicates;
      default:
        return episodes;
    }
  }
}
