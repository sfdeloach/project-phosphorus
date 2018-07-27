import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EpisodeHttpService } from '../../services/episode.http.service';
import { OfficerHttpService } from '../../services/officer.http.service';

import { Episode } from '../../models/episode.model';
import { Officer } from '../../models/officer.model';
import { Report } from '../../models/report.model';

import { flattenDeep } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  episodes: Episode[];
  officers: Officer[];
  episodeSubscription: Subscription;
  officerSubscription: Subscription;

  constructor(
    private episodeService: EpisodeHttpService,
    private officerService: OfficerHttpService
  ) {}

  ngOnInit() {
    this.episodeSubscription = this.episodeService.episodes.subscribe(
      (episodes: Episode[]) => {
        this.episodes = episodes;
      }
    );

    this.officerSubscription = this.officerService.officers.subscribe(
      (officers: Officer[]) => {
        this.officers = officers;
      }
    );

    // Copies may already exist
    if (this.episodeService.loadedEpisodes.length > 0) {
      this.episodes = this.episodeService.loadedEpisodes;
    } else {
      this.episodeService.getEpisodes();
    }

    if (this.officerService.loadedOfficers.length > 0) {
      this.officers = this.officerService.loadedOfficers;
    } else {
      this.officerService.getOfficers();
    }
  }

  ngOnDestroy() {
    this.episodeSubscription.unsubscribe();
    this.officerSubscription.unsubscribe();
  }

  // getCitationCount(type: string): number {
  //   switch (type) {
  //     case 'warning':
  //       return this.reports.filter(
  //         report =>
  //           report.offenses[0].ucrCode === '7200' && report.type === 'TC'
  //       ).length;
  //     case 'utt':
  //       return this.reports.filter(
  //         report =>
  //           report.offenses[0].ucrCode === '7100' &&
  //           report.type === 'TC' &&
  //           report.clearance === 'Inactive'
  //       ).length;
  //     case 'criminal':
  //       return this.reports.filter(
  //         report =>
  //           report.offenses[0].ucrCode === '7100' &&
  //           report.type === 'TC' &&
  //           report.clearance === 'Cleared By Arrest'
  //       ).length;
  //     default:
  //       return 0;
  //   }
  // }
}
