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

  constructor(private episodeHttpService: EpisodeHttpService) { }

  calcStats() {
    this.episodeHttpService.episodes.subscribe((episodes: Episode[]) => {
      this.episodes = episodes;
      this.currentStats = this.calcEpisodes();
      this.stats.next(this.currentStats);
    });
    this.episodeHttpService.getEpisodes();
  }

  calcEpisodes(): any {
    const episodeResults = {
      total: this.episodes.length,
      callOnly: 0,
      reportOnly: 0,
      callAndReport: 0,
      empty: 0,
      duplicates: undefined
    };
    const callResults = {
      total: 0,
      earliest: new Date(),
      latest: new Date(1970, 0, 1),
      first: 0,
      last: 0
    };
    const reportResults = {
      total: 43,
      offense: 43,
      uttAndWarnings: 43,
      cjis: 43,
      fcc: 43,
      trespass: 43,
      crash: 43,
      ap: 43
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
        if (new Date(episode.call.created) > callResults.latest) {
          callResults.latest = new Date(episode.call.created);
        }
        if (new Date(episode.call.created) < callResults.earliest) {
          callResults.earliest = new Date(episode.call.created);
        }
      }
    });

    return new EpisodeStatistics(episodeResults, callResults, reportResults);
  }
}
