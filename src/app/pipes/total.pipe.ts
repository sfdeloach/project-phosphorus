import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/episode.model';
import { flattenDeep } from 'lodash';

/*
 * Returns the length of arrays, argument is optional
 * Usage:
 *   episodes | total, returns the length of the episodes array
 *   episodes | total:calls, returns the number of calls
 *   episodes | total:reports, returns the number of reports
 */

@Pipe({ name: 'total' })
export class TotalPipe implements PipeTransform {
  transform(value: Episode[], type?: string) {
    if (type === 'calls') {
      return value.filter(episode => episode.call).length;
    } else if (type === 'reports') {
      console.log(value.filter(episodes => episodes.reports).length);
      console.log(flattenDeep(value.filter(episodes => episodes.reports)).length);
      return flattenDeep(value.filter(episodes => episodes.reports)).length;
    } else {
      return value.length;
    }
  }
}
