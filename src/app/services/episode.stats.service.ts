import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { EpisodeHttpService } from './episode.http.service';
import { EpisodeStatistics } from '../models/episode.statistics.model';
import { Episode } from '../models/episode.model';

@Injectable()
export class EpisodeStatsService {
  stats: Subject<EpisodeStatistics> = new Subject();
  currentStats: EpisodeStatistics;
  episodes: Episode[];
  eventNumbers: number[];

  constructor(private episodeHttpService: EpisodeHttpService) { }

  calcStats() {
    this.episodeHttpService.episodes.subscribe((episodes: Episode[]) => {
      this.episodes = episodes;
      this.currentStats = this.figureItOut();
      this.stats.next(this.currentStats);
    });
    this.episodeHttpService.getEpisodes();
  }

  figureItOut(): any {
    const episodeResults = {
      total: this.episodes.length,
      callOnly: 0,
      reportOnly: 0,
      callAndReport: 0,
      empty: 0,
      duplicates: 0
    };
    const callResults = {
      total: 0,
      earliest: new Date(),
      latest: new Date(1970, 0, 1),
      first: 20503659999,
      last: 0
    };
    const reportResults = {
      total: 0,
      offense: 0,
      uttAndWarnings: 0,
      cjis: 0,
      fcc: 0,
      trespass: 0,
      crash: 0,
      ap: 0
    };

    this.episodes.forEach(episode => {
      // Episode stat calculations
      if (episode.call && !episode.reports) {
        episodeResults.callOnly++;
      } else if (!episode.call && episode.reports) {
        episodeResults.reportOnly++;
      } else if (episode.call && episode.reports) {
        episodeResults.callAndReport++;
      } else if (!episode.call && !episode.reports) {
        episodeResults.empty++;
      }
      // Call stat calculations
      if (episode.call) {
        callResults.total++;
        // this.eventNumbers.push(episode.call.eventNbr); // used later to find dupes
        if (new Date(episode.call.created) > callResults.latest) {
          callResults.latest = new Date(episode.call.created);
        }
        if (new Date(episode.call.created) < callResults.earliest) {
          callResults.earliest = new Date(episode.call.created);
        }
        if (episode.call.eventNbr > callResults.last) {
          callResults.last = episode.call.eventNbr;
        }
        if (episode.call.eventNbr < callResults.first) {
          callResults.first = episode.call.eventNbr;
        }
      }
      // Report stat calculations
      if (episode.reports) {
        reportResults.total++;
        episode.reports.forEach(report => {
          if (report.type === 'OR') {
            reportResults.offense++;
          }
          if (report.type === 'TC') {
            reportResults.uttAndWarnings++;
          }
          if (report.type === 'CJ') {
            reportResults.cjis++;
          }
          if (report.type === 'FC') {
            reportResults.fcc++;
          }
          if (report.type === 'TP') {
            reportResults.trespass++;
          }
          if (report.type === 'TA') {
            reportResults.crash++;
          }
          if (report.type === 'AP') {
            reportResults.ap++;
          }
        });
      }
    });
    return new EpisodeStatistics(episodeResults, callResults, reportResults);
  }
}
