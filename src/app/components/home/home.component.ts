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
  episodeCount: number;
  episodeSubscription: Subscription;
  officerCount: number;
  officerSubscription: Subscription;

  constructor(
    private episodeService: EpisodeHTTPService,
    private officerService: OfficerHTTPService
  ) { }

  ngOnInit() {
    this.episodeCount = Number.MIN_SAFE_INTEGER;
    this.officerCount = Number.MIN_SAFE_INTEGER;

    this.episodeSubscription = this.episodeService.episodes.subscribe((episodes: Episode[]) => {
      this.episodeCount = episodes.length;
    });

    this.officerSubscription = this.officerService.officers.subscribe((officers: Officer[]) => {
      this.officerCount = officers.length;
    });

    this.episodeService.getEpisodes();
    this.officerService.getOfficers();
  }

  ngOnDestroy() {
    this.episodeSubscription.unsubscribe();
  }

}
