import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports = [];

  constructor() { }

  ngOnInit() {
  }

  onHeaderClick(header: string) {
    console.log(header + ' clicked');
  }

}
