import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductivityReport } from '../../models/productivity-reports/productivity-report.model';
import { ReportHttpService } from '../../services/report.http.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {
  reports: ProductivityReport[];
  reportsSubscription: Subscription;
  sortToggle = 1;

  constructor(private reportHttpService: ReportHttpService) {}

  ngOnInit() {
    console.log('ngOnInit report component');
    this.reportsSubscription = this.reportHttpService.reports.subscribe(
      (reports: ProductivityReport[]) => {
        this.reports = reports;
        this.onHeaderClick('created');
      }
    );

    this.reportHttpService.getReports();
  }

  ngOnDestroy() {
    this.reportsSubscription.unsubscribe();
  }

  onHeaderClick(property: string) {
    this.sortToggle = this.sortToggle * -1;
    this.reports.sort(this.sortByProperty(property));
  }

  sortByProperty(property: string) {
    if (property === 'numOfcs') {
      return (a: ProductivityReport, b: ProductivityReport): number => {
        if (a.report.length < b.report.length) {
          return -1 * this.sortToggle;
        }
        if (a.report.length > b.report.length) {
          return 1 * this.sortToggle;
        }
        return 0;
      };
    } else {
      return (a: ProductivityReport, b: ProductivityReport): number => {
        if (a.meta[property] < b.meta[property]) {
          return -1 * this.sortToggle;
        }
        if (a.meta[property] > b.meta[property]) {
          return 1 * this.sortToggle;
        }
        return 0;
      };
    }
  }
}
