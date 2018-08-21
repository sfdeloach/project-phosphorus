import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs/observable/zip';
import { Subscription } from 'rxjs/Subscription';
import { ReportService } from '../../../services/report.service';
import { ReportHttpService } from '../../../services/report.http.service';
import { OfficerHttpService } from '../../../services/officer.http.service';
import { EpisodeHttpService } from '../../../services/episode.http.service';
import { AuthService } from '../../../services/auth.service';
import { ReportMetaData } from '../../../models/productivity-reports/report.metadata.model';
import { Officer } from '../../../models/officer.model';
import { Episode } from '../../../models/episode.model';
import { ProductivityReport } from '../../../models/productivity-reports/productivity-report.model';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit, OnDestroy {
  unsavedReport: boolean;
  reportMetaData: ReportMetaData;
  reportColumnNames: string[] = [];
  reportData: any[];
  reportSubscription: Subscription;
  responseSubscription: Subscription;
  sortToggle = 1;
  reportID: string;

  constructor(
    private reportService: ReportService,
    private reportHttpService: ReportHttpService,
    private officerService: OfficerHttpService,
    private episodeService: EpisodeHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Response subscription to navigate to report overview page
    // when a report is either saved or deleted
    this.responseSubscription = this.reportHttpService.response.subscribe(() =>
      this.router.navigate(['/reports'])
    );

    if (this.activatedRoute.snapshot.params['id']) {
      this.unsavedReport = false;
      this.reportSubscription = this.reportHttpService.report.subscribe(report => {
        this.reportMetaData = report[0].meta;
        this.reportData = report[0].report;
        this.setColumnNames();
      });
      this.reportID = this.activatedRoute.snapshot.params['id'];
      this.reportHttpService.getReport(this.reportID);
    } else {
      this.unsavedReport = true;
      this.reportMetaData = this.reportService.reportMetadata;

      zip(
        this.officerService.officers,
        this.episodeService.episodes,
        (officers: Officer[], episodes: Episode[]) => ({ officers, episodes })
      ).subscribe(x => {
        this.reportService.includedOfcs = this.prepareIncludedOfficerList(x.officers);
        this.reportService.episodes = x.episodes;
        this.buildReport();
      });

      if (
        this.officerService.loadedOfficers.length > 0 &&
        this.episodeService.loadedEpisodes.length > 0
      ) {
        this.reportService.includedOfcs = this.prepareIncludedOfficerList(
          this.officerService.loadedOfficers
        );
        this.reportService.episodes = this.episodeService.loadedEpisodes;
        this.buildReport();
      } else {
        this.officerService.getOfficers();
        this.episodeService.getEpisodes();
      }
    }
  }

  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
    if (this.reportSubscription) {
      this.reportSubscription.unsubscribe();
    }
  }

  prepareIncludedOfficerList(officers: Officer[]): Officer[] {
    return officers
      .filter(ofc => ofc.include)
      .map(ofc => new Officer(ofc.deptID, ofc.name, ofc.squad));
  }

  buildReport() {
    this.reportData = this.reportService.buildReport();

    if (this.reportData && this.reportData.length > 0) {
      this.setColumnNames();
    } else {
      this.reportData = [];
    }
  }

  setColumnNames() {
    this.reportColumnNames = Object.getOwnPropertyNames(this.reportData[0]).filter(
      colNames => colNames !== 'officer'
    );
  }

  saveReport() {
    this.reportHttpService.insertReport(
      new ProductivityReport(this.reportMetaData, this.reportData)
    );
  }

  deleteReport() {
    this.reportHttpService.deleteReport(this.reportID);
  }

  onHeaderClick(parent: string, childOne?: string, childTwo?: string) {
    this.sortToggle = this.sortToggle * -1;
    this.reportData.sort(this.sortByProperty(this.sortToggle, parent, childOne, childTwo));
  }

  /*
     this is the sort used when the user clicks on a table header
  */
  sortByProperty(toggle: number, parent: string, child1?: string, child2?: string) {
    if (child1 && child2) {
      return (a: any, b: any): number => {
        if (a[parent][child1][child2] < b[parent][child1][child2]) {
          return -1 * toggle;
        }
        if (a[parent][child1][child2] > b[parent][child1][child2]) {
          return 1 * toggle;
        }
        return 0;
      };
    } else if (child1) {
      return (a: any, b: any): number => {
        if (a[parent][child1] < b[parent][child1]) {
          return -1 * toggle;
        }
        if (a[parent][child1] > b[parent][child1]) {
          return 1 * toggle;
        }
        return 0;
      };
    } else {
      return (a: any, b: any): number => {
        if (a[parent] < b[parent]) {
          return -1 * toggle;
        }
        if (a[parent] > b[parent]) {
          return 1 * toggle;
        }
        return 0;
      };
    }
  }
}
