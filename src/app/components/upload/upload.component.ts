import { Component, OnInit } from '@angular/core';

import { UploadService } from '../../services/upload.service';

import { Result } from '../../models/result.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  showInfo: boolean = false;
  file: File;
  contents: string;
  verifier: Result;
  serverResponse: Result;

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {

  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  fileChanged(file: File) {
    this.file = file;

    // reset some properties
    this.verifier = undefined;
    this.contents = "";
    this.serverResponse = undefined;
  }

  verify() {
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(this.file);

    fileReader.onload = (evt: ProgressEvent) => {
      this.verifier = this.uploadService.verify(fileReader.result);
      if (this.verifier.isOkay) {
        this.contents = fileReader.result;
      }
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
