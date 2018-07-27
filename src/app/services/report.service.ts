import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {
  set newReport(data) {
    this.data = data;
  }
  data;

  constructor() {}
}
