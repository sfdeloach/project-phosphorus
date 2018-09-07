import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ProductivityReport } from '../models/productivity-reports/productivity-report.model';
import { InsertManyResponse } from '../models/responses/insert.many.model';
import { RemoveResponse } from '../models/responses/remove.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportHttpService {
  reports = new Subject<ProductivityReport[]>();
  report = new Subject<ProductivityReport>();
  reportsUrl: string = environment.apiUrl + 'reports';
  response: Subject<any> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getReports() {
    this.http.get<ProductivityReport[]>(this.reportsUrl).subscribe(
      (rpts: ProductivityReport[]) => {
        this.reports.next(rpts);
      },
      err => {
        console.error(err);
        this.reports.next([err]);
      }
    );
  }

  getReport(id: string) {
    this.http.get<ProductivityReport>(`${this.reportsUrl}/${id}`).subscribe(
      (report: ProductivityReport) => {
        this.report.next(report);
      },
      err => {
        console.error(err);
        this.report.next(err);
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
          this.response.next('insert');
        },
        error => {
          console.error(error);
          this.response.next(error);
        }
      );
  }

  updateReportTitle(newTitle: string, id: string) {
    this.http.put(`${this.reportsUrl}/${id}`, {title: newTitle}, this.httpOptions).subscribe(
      res => {
        this.response.next('update');
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }

  deleteReport(id: string) {
    this.http.delete<RemoveResponse>(`${this.reportsUrl}/${id}`, this.httpOptions).subscribe(
      (res: RemoveResponse) => {
        this.response.next('delete');
      },
      error => {
        console.error(error);
        this.response.next(error);
      }
    );
  }
}
