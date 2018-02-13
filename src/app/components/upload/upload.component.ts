import { Component, OnInit } from '@angular/core';

import { UploadService } from '../../services/upload.service';

import { Verifier } from '../../models/verifier.model';
import { ServerResponse } from '../../models/server-response.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  showInfo: boolean = false;
  file: File;
  verifier: Verifier;
  contents: string;
  serverResponse: ServerResponse;

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
      if (this.verifier.result) {
        this.contents = fileReader.result;
      }
      console.dir(this.uploadService.episodes); // TODO: remove after testing
    };
  }

  upload() {
    // The lines read during the upload will be reported by the server
    this.uploadService.serverResponse.subscribe(
      (res: ServerResponse) => {
        this.serverResponse = res;
      });
    this.uploadService.uploader();
  }

}
