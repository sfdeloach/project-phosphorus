import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { OfficerHttpService } from '../../../services/officer.http.service';
import { Officer } from '../../../models/officer.model';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  officers: Officer[];

  constructor(private reportService: ReportService, private officerService: OfficerHttpService) { }

  ngOnInit() {
    console.log(this.reportService.data);
    this.officers = this.officerService.getIncludedOfficers();
  }

}
