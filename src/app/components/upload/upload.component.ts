import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHttpService } from '../../services/officer.http.service';
import { UploadService } from '../../services/upload.service';
import { EpisodeHttpService } from '../../services/episode.http.service';

import { Officer } from '../../models/officer.model';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  showInfo = false;
  file: File;
  officers: Officer[];
  messages: Message[];
  subOfficers: Subscription;
  subUploadMessages: Subscription;
  subEpisodeMessages: Subscription;

  constructor(
    private officerService: OfficerHttpService,
    private uploadService: UploadService,
    private episodeService: EpisodeHttpService
  ) { }

  ngOnInit() {
    this.clearMessages();

    this.subOfficers = this.officerService.officers.subscribe(
      (ofcs: Officer[]) => {
        this.messages.push(
          new Message('Ready to upload')
        );
        this.officers = ofcs;
      }
    );

    this.subUploadMessages = this.uploadService.message.subscribe(
      (message: Message) => {
        this.clearMessages();
        this.messages.push(message);
      }
    );

    this.subEpisodeMessages = this.episodeService.message.subscribe(
      (message: Message) => {
        this.clearMessages();
        this.messages.push(message);
      }
    );
  }

  ngOnDestroy() {
    this.subOfficers.unsubscribe();
    this.subUploadMessages.unsubscribe();
    this.subEpisodeMessages.unsubscribe();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  clearMessages() {
    this.messages = [];
  }

  fileChanged(file: File) {
    this.file = file;
    this.clearMessages();
    this.officerService.getOfficers();
  }

  upload() {
    this.clearMessages();
    this.messages.push(
      new Message(null, null, 'One moment please...processing file...')
    );

    const fileReader: FileReader = new FileReader();
    fileReader.readAsText(this.file);

    fileReader.onload = (evt: ProgressEvent) => {
      setTimeout(() => {
        this.uploadService.upload(fileReader.result, this.officers);
      }, 1000);
    };
  }
}
