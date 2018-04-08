import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHTTPService } from '../../services/officer.http.service';
import { EpisodeHTTPService } from '../../services/episode.http.service';
import { UploadService } from '../../services/upload.service';

import { Officer } from '../../models/officer.model';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  showInfo: boolean = false;
  file: File;
  officers: Officer[];
  currentEpisodes: Episode[];
  subOfficers: Subscription;
  subEpisodes: Subscription;
  subEpisodesResponse: Subscription;
  subOfficersResponse: Subscription;
  serverResponses: any; // TODO: is this the correct type?
  verifier; // TODO determine the type

  constructor(
    private officerService: OfficerHTTPService,
    private episodeService: EpisodeHTTPService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.subOfficers = this.officerService.officers.subscribe(
      (ofcs: Officer[]) => {
        this.officers = ofcs;
      }
    );

    this.subEpisodes = this.episodeService.episodes.subscribe(
      (episodes: Episode[]) => {
        this.currentEpisodes = episodes;
      }
    );

    this.subOfficersResponse = this.officerService.response.subscribe(
      (res: any) => {
        this.serverResponses.push(res);
      }
    )

    this.subEpisodesResponse = this.episodeService.response.subscribe(
      (res: any) => {
        this.serverResponses.push(res);
      });
  }

  ngOnDestroy() {
    this.subOfficers.unsubscribe();
    this.subEpisodes.unsubscribe();
    this.subOfficersResponse.unsubscribe();
    this.subEpisodesResponse.unsubscribe();
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
    let episodesDeepCopy = JSON.parse(JSON.stringify(this.currentEpisodes));

    fileReader.onload = (evt: ProgressEvent) => {
      this.verifier = this.uploadService.verify(
        fileReader.result,
        this.officers,
        episodesDeepCopy);
    };
  }

  upload() {
    // a copy of the old episodes is passed to the service
    this.uploadService.uploader(this.currentEpisodes);
  }

}
