import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EpisodeHTTPService } from '../../services/episode.http.service';
import { OfficerHTTPService } from '../../services/officer.http.service';

import { Episode } from '../../models/episode.model';
import { Officer } from '../../models/officer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  episodes: Episode[];
  episodeSubscription: Subscription;
  officers: Officer[];
  officerSubscription: Subscription;

  episodeCount: number;
  startingDate: Date;
  endingDate: Date;
  firstEvent: number;
  lastEvent: number;
  reportCount: number;
  officerCount: number;
  officerIncludedCount: number;

  constructor(
    private episodeService: EpisodeHTTPService,
    private officerService: OfficerHTTPService
  ) { }

  ngOnInit() {
    this.episodeCount = Number.NEGATIVE_INFINITY;
    this.startingDate = new Date('January 1, 1970');
    this.endingDate = new Date('January 1, 2170');
    this.firstEvent = Number.POSITIVE_INFINITY;
    this.lastEvent = Number.NEGATIVE_INFINITY;
    this.reportCount = Number.NEGATIVE_INFINITY;
    this.officerCount = Number.NEGATIVE_INFINITY;
    this.officerIncludedCount = Number.NEGATIVE_INFINITY;

    this.episodeSubscription = this.episodeService.episodes.subscribe(
      (episodes: Episode[]) => {
        this.episodes = episodes;
        this.episodeCount = episodes.length;
        this.findEpisodeRanges();
      }
    );

    this.officerSubscription = this.officerService.officers.subscribe(
      (officers: Officer[]) => {
        this.officers = officers;
        this.officerCount = officers.length;
        this.findOfficerRanges();
      }
    );

    this.episodeService.getEpisodes();
    this.officerService.getOfficers();
  }

  ngOnDestroy() {
    this.episodeSubscription.unsubscribe();
    this.officerSubscription.unsubscribe();
  }

  findOfficerRanges() {
    let includedOfcs = 0;

    this.officers.forEach((officer: Officer) => {
      if (officer.include) { includedOfcs += 1; }
    });

    this.officerIncludedCount = includedOfcs;
  }

  findEpisodeRanges() {
    let minDate: Date = this.endingDate;
    let maxDate: Date = this.startingDate;
    let firstEvt: number = this.firstEvent;
    let lastEvt: number = this.lastEvent;
    let reportCnt = 0;

    this.episodes.forEach((episode: Episode) => {
      const date: Date = this.getCallDate(episode);
      const evt: number = episode.call.eventNbr;
      if (date < minDate) { minDate = date; }
      if (date > maxDate) { maxDate = date; }
      if (evt < firstEvt ) { firstEvt = evt; }
      if (evt > lastEvt ) { lastEvt = evt; }
      if (episode.reports.length > 0) { reportCnt += episode.reports.length; }
    });

    this.startingDate = minDate;
    this.endingDate = maxDate;
    this.firstEvent = firstEvt;
    this.lastEvent = lastEvt;
    this.reportCount = reportCnt;
  }

  // helper function
  getCallDate(episode: Episode): Date {
    return new Date(episode.call.created);
  }

  getJSON() {
    // TODO: necessary to implement this feature?
    alert('This feature not available.');
  }

}
