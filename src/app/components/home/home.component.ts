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
  episodeSub: Subscription;
  officers: Officer[];
  officerSub: Subscription;

  episodeCount: number;
  startingDate: Date;
  endingDate: Date;
  firstEvent: number;
  lastEvent: number;
  reports: Report[];
  officerCount: number;
  officerIncludedCount: number;

  constructor(
    private episodeService: EpisodeHttpService,
    private officerService: OfficerHttpService
  ) {}

  ngOnInit() {
    this.startingDate = new Date('January 1, 1970');
    this.endingDate = new Date('January 1, 2170');
    this.firstEvent = Number.POSITIVE_INFINITY;
    this.lastEvent = Number.NEGATIVE_INFINITY;

    this.episodeSub = this.episodeService.episodes.subscribe(
      (episodes: Episode[]) => {
        this.episodes = episodes;
        this.episodeCount = episodes.length;
        this.findEpisodeRanges();
      }
    );

    this.officerSub = this.officerService.officers.subscribe(
      (officers: Officer[]) => {
        this.officers = officers;
        this.officerCount = officers.length;
        this.findOfficerRanges();
      }
    );

    // See if a copy of episodes already exists
    if (this.episodeService.loadedEpisodes.length > 0) {
      this.episodes = this.episodeService.loadedEpisodes;
      this.findEpisodeRanges();
    } else {
      this.episodeService.getEpisodes();
    }

    this.officerService.getOfficers();
  }

  ngOnDestroy() {
    this.episodeSub.unsubscribe();
    this.officerSub.unsubscribe();
  }

  findOfficerRanges() {
    let includedOfcs = 0;

    this.officers.forEach((officer: Officer) => {
      if (officer.include) {
        includedOfcs += 1;
      }
    });

    this.officerIncludedCount = includedOfcs;
  }

  findEpisodeRanges() {
    const eventDateValues: number[] = this.episodes
      .filter(evt => evt.call)
      .map(evt => new Date(evt.call.created).getTime());
    this.startingDate = new Date(Math.min(...eventDateValues));
    this.endingDate = new Date(Math.max(...eventDateValues));

    const eventNumbers: number[] = this.episodes
      .filter(evt => evt.call)
      .map(evt => evt.call.eventNbr);
    this.firstEvent = Math.min(...eventNumbers);
    this.lastEvent = Math.max(...eventNumbers);

    this.reports = flattenDeep(
      this.episodes
        .filter(episode => episode.reports)
        .map(episode => episode.reports as Report[])
    ) as Report[];
  }

  getReportCount(type: string): number {
    return this.reports.filter(report => report.type === type).length;
  }

  getCitationCount(type: string): number {
    switch (type) {
      case 'warning':
        return this.reports.filter(
          report =>
            report.offenses[0].ucrCode === '7200' && report.type === 'TC'
        ).length;
      case 'utt':
        return this.reports.filter(
          report =>
            report.offenses[0].ucrCode === '7100' &&
            report.type === 'TC' &&
            report.clearance === 'Inactive'
        ).length;
      case 'criminal':
        return this.reports.filter(
          report =>
            report.offenses[0].ucrCode === '7100' &&
            report.type === 'TC' &&
            report.clearance === 'Cleared By Arrest'
        ).length;
      default:
        return 0;
    }
  }
}
