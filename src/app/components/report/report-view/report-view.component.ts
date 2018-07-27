import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs/observable/zip';
import { ReportService } from '../../../services/report.service';
import { OfficerHttpService } from '../../../services/officer.http.service';
import { EpisodeHttpService } from '../../../services/episode.http.service';
import { ReportData } from '../../../models/report.data.model';
import { Officer } from '../../../models/officer.model';
import { Episode } from '../../../models/episode.model';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  reportData: ReportData;
  officersIDs: number[] = [];
  episodes: Episode[] = [];

  constructor(
    private reportService: ReportService,
    private officerService: OfficerHttpService,
    private episodeService: EpisodeHttpService
  ) {}

  ngOnInit() {
    this.reportData = this.reportService.reportData;

    zip(
      this.officerService.officers,
      this.episodeService.episodes,
      (officers: Officer[], episodes: Episode[]) => ({ officers, episodes })
    ).subscribe(x => {
      this.officersIDs = this.prepareIncludedOfficerList(x.officers);
      this.episodes = x.episodes;
    });

    if (this.officerService.loadedOfficers.length > 0) {
      this.officersIDs = this.prepareIncludedOfficerList(this.officerService.loadedOfficers);
    } else {
      this.officerService.getOfficers();
    }

    if (this.episodeService.loadedEpisodes.length > 0) {
      this.episodes = this.episodeService.loadedEpisodes;
    } else {
      this.episodeService.getEpisodes();
    }
  }

  prepareIncludedOfficerList(officers: Officer[]): number[] {
    return officers
      .filter(ofc => ofc.include)
      .map(ofc => ofc.deptID)
      .sort();
  }
}
