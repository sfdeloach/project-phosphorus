import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/episode.model';

@Pipe({ name: 'episodeInfo' })
export class EpisodeInfoPipe implements PipeTransform {
  transform(episodes: Episode[], flag: string): Episode[] {
    const call: Episode[] = [];
    const report: Episode[] = [];
    const both: Episode[] = [];
    const empty: Episode[] = [];

    episodes.forEach(episode => {
      if (episode.call && !episode.reports) {
        call.push(episode);
      } else if (!episode.call && episode.reports) {
        report.push(episode);
      } else if (episode.call && episode.reports) {
        both.push(episode);
      } else if (!episode.call && !episode.reports) {
        empty.push(episode);
      }
    });

    switch (flag) {
      case 'calls-only':
        return call;
      case 'reports-only':
        return report;
      case 'calls-and-reports':
        return both;
      case 'empty-episodes':
        return empty;
      default:
        return episodes;
    }
  }
}
