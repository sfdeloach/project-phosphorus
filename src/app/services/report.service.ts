import { Injectable } from '@angular/core';
import { ReportData } from '../models/report.data.model';

@Injectable()
export class ReportService {
  reportData: ReportData;

  constructor() {}
}
