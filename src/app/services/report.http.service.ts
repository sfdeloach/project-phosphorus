import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ProductivityReport } from '../models/productivity-reports/productivity-report.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { ApiUrlsList } from './lists/api.urls.list';

@Injectable()
export class ReportHttpService {
  reportsUrl: string = this.url.reportAPI;
  response: Subject<any> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private url: ApiUrlsList) {}

  getReports() {
    // TODO!!!
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
        },
        error => {
          console.error(error);
          this.response.next(error);
        }
      );
  }
}
