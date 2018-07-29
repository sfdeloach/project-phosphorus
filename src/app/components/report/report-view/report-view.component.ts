import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs/observable/zip';
import { ReportService } from '../../../services/report.service';
import { OfficerHttpService } from '../../../services/officer.http.service';
import { EpisodeHttpService } from '../../../services/episode.http.service';
import { ReportMetaData } from '../../../models/productivity-reports/report.metadata.model';
import { Officer } from '../../../models/officer.model';
import { Episode } from '../../../models/episode.model';
import { InitiatedDispo } from '../../../models/productivity-reports/initiated-dispo.model';
import { NonInitiated } from '../../../models/productivity-reports/non-initiated.model';
import { OverallInitiated } from '../../../models/productivity-reports/overall-initiated.model';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  reportMetaData: ReportMetaData;
  reportColumnNames: string[] = [];
  reportData: any[];
  // reportData: InitiatedDispo[] | NonInitiated[] | OverallInitiated[];
  sortToggle = 1;

  constructor(
    private reportService: ReportService,
    private officerService: OfficerHttpService,
    private episodeService: EpisodeHttpService
  ) {}

  ngOnInit() {
    this.reportMetaData = this.reportService.reportMetadata;

    zip(
      this.officerService.officers,
      this.episodeService.episodes,
      (officers: Officer[], episodes: Episode[]) => ({ officers, episodes })
    ).subscribe(x => {
      this.reportService.includedOfcs = this.prepareIncludedOfficerList(
        x.officers
      );
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

  prepareIncludedOfficerList(officers: Officer[]): Officer[] {
    return officers
      .filter(ofc => ofc.include)
      .map(ofc => new Officer(ofc.deptID, ofc.name, ofc.squad));
  }

  buildReport() {
    this.reportData = this.reportService.buildReport();

    if (this.reportData && this.reportData.length > 0) {
      this.reportColumnNames = Object.getOwnPropertyNames(
        this.reportData[0]
      ).filter(colNames => colNames !== 'officer');
    } else {
      this.reportData = [];
    }
  }

  onHeaderClick(parent: string, childOne?: string, childTwo?: string) {
    this.sortToggle = this.sortToggle * -1;
    this.reportData.sort(
      this.sortByProperty(this.sortToggle, parent, childOne, childTwo)
    );
  }

  /*
     this is the sort used when the user clicks on a table header
  */
  sortByProperty(
    toggle: number,
    parent: string,
    child1?: string,
    child2?: string
  ) {
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
