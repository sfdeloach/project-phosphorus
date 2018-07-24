import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/episode.model';
import { flattenDeep } from 'lodash';

@Pipe({ name: 'isolate' })
export class IsolatePipe implements PipeTransform {
  transform(value: Episode[], type: string) {
    const flatArray = value
      .filter(episodes => episodes[type])
      .map(episodes => episodes[type]);
    return flattenDeep(flatArray);
  }
}
