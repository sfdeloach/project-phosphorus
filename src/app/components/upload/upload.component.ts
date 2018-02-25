import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OfficerService } from '../../services/officer.service';
import { EpisodeService } from '../../services/episode.service';
import { UploadService } from '../../services/upload.service';

import { Officer } from '../../models/officer.model';
import { Episode } from '../../models/episode.model';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  file: File;
  officers: Officer[];
  episodes: Episode[];
  officerSubscription: Subscription;
  episodeSubscription: Subscription;
  uploadSubscription: Subscription;
  serverResponse: Result;
  showInfo: boolean = false;
  verifier: Result;

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
        this.episodes = episodes;
      }
    );

    this.uploadSubscription = this.uploadService.serverResponse.subscribe(
      (res: Result) => {
        this.serverResponse = res;
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
    this.serverResponse = undefined;
    this.officerService.getOfficers();
    this.episodeService.getEpisodes();
  }

  verify() {
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (evt: ProgressEvent) => {
      this.verifier = this.uploadService.verify(
        fileReader.result,
        this.officers,
        this.episodes);
      console.dir(this.uploadService.episodes); // TODO: remove after testing
    };
  }

  upload() {
    this.uploadService.uploader();
  }

}
