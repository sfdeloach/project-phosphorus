import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ProductivityReport } from '../models/productivity-reports/productivity-report.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { ApiUrlsList } from './lists/api.urls.list';

@Injectable()
export class ReportHttpService {
  reports = new Subject<ProductivityReport[]>();
  reportsUrl: string = this.url.reportAPI;
  response: Subject<any> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private url: ApiUrlsList) {}

  getReports() {
    this.http.get<ProductivityReport[]>(this.reportsUrl).subscribe(
      (rpts: ProductivityReport[]) => {
        this.reports.next(rpts);
        console.log('getReports');
      },
      err => {
        console.error(err);
        this.reports.next([err]);
      }
    );
  }

  insertReport(report: ProductivityReport) {
    this.http
    .post<InsertManyResponse<ProductivityReport>>(
      this.reportsUrl,
      { reports: [report] },
      this.httpOptions
    )
    .subscribe(
      (res: InsertManyResponse<ProductivityReport>) => {
        this.response.next(res);
        console.log('insertReport');
        },
        error => {
          console.error(error);
          this.response.next(error);
        }
      );
  }
}
