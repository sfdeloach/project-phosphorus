import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OfficerService } from '../../services/officer.service';
import { UploadService } from '../../services/upload.service';

import { Officer } from '../../models/officer.model';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  file: File;
  officers: Officer[];
  officerSubscription: Subscription;
  serverResponse: Result;
  showInfo: boolean = false;
  verifier: Result;

  constructor(
    private officerService: OfficerService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.officerSubscription = this.officerService.officers.subscribe(
      (ofcs: Officer[]) => {
        this.officers = ofcs;
      }
    );
  }

  ngOnDestroy() {
    this.officerSubscription.unsubscribe();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  fileChanged(file: File) {
    this.file = file;
    this.verifier = undefined;
    this.serverResponse = undefined;
    this.officerService.getOfficers();
  }

  verify() {
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (evt: ProgressEvent) => {
      this.verifier = this.uploadService.verify(fileReader.result, this.officers);
      console.dir(this.uploadService.episodes); // TODO: remove after testing
    };
  }

  upload() {
    // The lines read during the upload will be reported by the server
    this.uploadService.serverResponse.subscribe(
      (res: Result) => {
        this.serverResponse = res;
      });
    this.uploadService.uploader();
  }

}
