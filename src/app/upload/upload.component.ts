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
  verifier: Verifier;
  contents: string;
  eventsRead: number;

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

    // clear contents and eventsRead to reset UI
    this.verifier = undefined;
    this.contents = "";
    this.eventsRead = undefined;
  }

  verify() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (e) => {
      this.verifier = this.uploadService.verify(fileReader.result);
      if (this.verifier.result) this.contents = fileReader.result;
    }
  }

  upload() {
    this.uploadService.linesRead.subscribe(
      (linesRead: number) => {
        this.eventsRead = linesRead;
      });
    this.uploadService.uploader();
  }

}
