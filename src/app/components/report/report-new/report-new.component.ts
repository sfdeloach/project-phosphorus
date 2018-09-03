import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportTypesList } from '../../../lists/report.types.list';
import { ReportService } from '../../../services/report.service';
import { Router } from '@angular/router';
import { EpisodeHttpService } from '../../../services/episode.http.service';
import { OfficerHttpService } from '../../../services/officer.http.service';

@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.css']
})
export class ReportNewComponent implements OnInit {
  newReportForm: FormGroup;
  reportTypes: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private episodeHttpService: EpisodeHttpService,
    private officerHttpService: OfficerHttpService,
    private reportList: ReportTypesList,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.newReportForm = this.formBuilder.group({
      title: ['', Validators.required],
      reportType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.reportTypes = this.reportList.reportTypes.sort();

    // Refresh the list of episodes and officers
    this.episodeHttpService.getEpisodes();
    this.officerHttpService.getOfficers();
  }

  onSubmit() {
    this.newReportForm.value.created = new Date();

    this.newReportForm.value.startDate = new Date(
      this.newReportForm.value.startDate + 'T00:00:00.000'
    );

    this.newReportForm.value.endDate = new Date(
      this.newReportForm.value.endDate + 'T23:59:59.999'
    );

    this.reportService.reportMetadata = this.newReportForm.value;

    this.router.navigate(['/reports/view']);
  }

  resetForm() {
    this.newReportForm.reset();
  }
}
