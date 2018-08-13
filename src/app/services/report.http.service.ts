import { Injectable } from '@angular/core';
import { ProductivityReport } from '../models/productivity-reports/productivity-report.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlsList } from './lists/api.urls.list';

@Injectable()
export class ReportHttpService {
  reportsUrl: string = this.url.reportAPI;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private url: ApiUrlsList
  ) { }

  getReports() {
    // TODO!!!
  }

  insertReport(report: ProductivityReport) {
    console.log(report);
    // Note: the below code is ready for testing once API is built
    //
    // this.http.post(
    //   this.reportsUrl,
    //   { 'report': report },
    //   this.httpOptions
    // ).subscribe(
    //   res => {
    //     console.log('Success saving report');
    //     console.log(res);
    //   },
    //   error => {
    //     console.error('Error occurred saving report');
    //     console.error(error);
    //   }
    // );
  }

}
