import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report.model';

@Pipe({ name: 'report' })
export class ReportPipe implements PipeTransform {
  transform(value: Report[], type: string): Report[] {
    return value.filter(report => report.type === type);
  }
}
