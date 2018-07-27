import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportTypesList } from '../../../services/lists/report.types.list';
import { ReportService } from '../../../services/report.service';
import { Router } from '@angular/router';

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
    private reportList: ReportTypesList,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newReportForm = this.formBuilder.group({
      title: ['', Validators.required],
      reportType: ['', Validators.required]
    });

    this.reportTypes = this.reportList.reportTypes.sort();
  }

  onSubmit() {
    this.newReportForm.value.created = new Date();
    this.reportService.newReport = this.newReportForm.value;
    this.router.navigate(['/reports/view']);
  }

  resetForm() {
    this.newReportForm.reset();
  }
}
