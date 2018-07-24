import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/episode.model';
import { flattenDeep } from 'lodash';

@Pipe({ name: 'total' })
export class TotalPipe implements PipeTransform {
  transform(value: Episode[], type?: string) {
    if (type) {
      const callArray = value
        .filter(episodes => episodes[type])
        .map(episodes => episodes[type]);
      return flattenDeep(callArray).length;
    } else {
      return value.length;
    }
  }
}
