import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EpisodeStatsService } from '../../services/episode.stats.service';
import { OfficerHttpService } from '../../services/officer.http.service';
import { Officer } from '../../models/officer.model';
import { EpisodeStatistics } from '../../models/episode.statistics.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  officers: Officer[];
  officerSubscription: Subscription;
  episodeStats: EpisodeStatistics;
  episodeStatsSubscription: Subscription;

  constructor(
    private episodeStatsService: EpisodeStatsService,
    private officerService: OfficerHttpService
  ) {}

  ngOnInit() {
    this.episodeStatsSubscription = this.episodeStatsService.stats.subscribe(
      (stats: EpisodeStatistics) => {
        this.episodeStats = stats;
      }
    );

    this.officerSubscription = this.officerService.officers.subscribe((officers: Officer[]) => {
      this.officers = officers;
    });

    if (this.episodeStatsService.currentStats) {
      this.episodeStats = this.episodeStatsService.currentStats;
    } else {
      this.episodeStatsService.calcStats();
    }

    if (this.officerService.loadedOfficers.length > 0) {
      this.officers = this.officerService.loadedOfficers;
    } else {
      this.officerService.getOfficers();
    }
  }

  ngOnDestroy() {
    this.episodeStatsSubscription.unsubscribe();
    this.officerSubscription.unsubscribe();
  }

  refreshStats() {
    this.episodeStats = undefined;
    this.episodeStatsService.calcStats();
    this.officers = undefined;
    this.officerService.getOfficers();
  }
}
