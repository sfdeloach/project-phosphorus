import { Component, OnInit } from '@angular/core';

import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  file: File;
  contents: string;
  verifier: {
    result: boolean,
    messages: string[]
  };

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  fileChanged(e: Event) {
    let target = <HTMLInputElement>e.target;
    this.file = target.files[0];
  }

  verify() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (e) => {
      this.contents = ""; // make sure contents are clear
      this.verifier = this.uploadService.verify(fileReader.result);
      if (this.verifier.result) this.contents = fileReader.result;
    }
  }

  upload() {
    // TODO: upload contents to a database
  }

}
