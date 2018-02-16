import { Component, OnInit } from '@angular/core';

import { OfficerService } from '../../services/officer.service';
import { UploadService } from '../../services/upload.service';

import { Result } from '../../models/result.model';
import { Officer } from '../../models/officer.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  showInfo: boolean = false;
  file: File;
  officers: Officer[];
  verifier: Result;
  serverResponse: Result;

  constructor(
    private officerService: OfficerService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.officerService.officers.subscribe(
      (ofcs: Officer[]) => {
        this.officers = ofcs;
      }
    );
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
