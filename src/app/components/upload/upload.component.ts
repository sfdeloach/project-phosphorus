import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OfficerService } from '../../services/officer.http.service';
import { EpisodeService } from '../../services/episode.http.service';
import { UploadService } from '../../services/upload.service';

import { Officer } from '../../models/officer.model';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  file: File;
  officers: Officer[];
  originalEpisodes: Episode[];
  officerSubscription: Subscription;
  episodeSubscription: Subscription;
  uploadSubscription: Subscription;
  serverResponses; // TODO determine the type
  showInfo: boolean = false;
  verifier; // TODO determine the type

  constructor(
    private officerService: OfficerService,
    private episodeService: EpisodeService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.officerSubscription = this.officerService.officers.subscribe(
      (ofcs: Officer[]) => {
        this.officers = ofcs;
      }
    );

    this.episodeSubscription = this.episodeService.episodes.subscribe(
      (episodes: Episode[]) => {
        this.originalEpisodes = episodes;
      }
    );

    this.uploadSubscription = this.episodeService.serverResponse.subscribe(
      (res) => { // TODO: determine the type
        this.serverResponses.push(res);
      });
  }

  ngOnDestroy() {
    this.officerSubscription.unsubscribe();
    this.episodeSubscription.unsubscribe();
    this.uploadSubscription.unsubscribe();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  fileChanged(file: File) {
    this.file = file;
    this.verifier = undefined;
    this.serverResponses = [];
    this.officerService.getOfficers();
    this.episodeService.getEpisodes();
  }

  verify() {
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(this.file);

    // need to preserve what resides on the db for later comparison
    let episodesDeepCopy = JSON.parse(JSON.stringify(this.originalEpisodes));

    fileReader.onload = (evt: ProgressEvent) => {
      this.verifier = this.uploadService.verify(
        fileReader.result,
        this.officers,
        episodesDeepCopy);
    };
  }

  upload() {
    // a copy of the old episodes is passed to the service
    this.uploadService.uploader(this.originalEpisodes);
  }

}
