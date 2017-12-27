import { Component, OnInit } from '@angular/core';

import { UploadService } from '../services/upload.service';
import { Verifier } from '../models/verifier.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  showInstructions: boolean = false;
  file: File;
  contents: string; // 'blob' a better type here?
  verifier: Verifier;

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  fileChanged(e: Event) {
    let target = <HTMLInputElement>e.target;
    this.file = target.files[0];
    this.verifier = undefined;
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
    console.log(this.contents);
  }

}
