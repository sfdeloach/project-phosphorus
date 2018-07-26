import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(array: any[], key: string, value: string): any[] {
    return array.filter(element => element[key] === value);
  }
}
