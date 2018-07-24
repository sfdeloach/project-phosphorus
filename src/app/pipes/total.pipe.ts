import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'total' })
export class TotalPipe implements PipeTransform {
  transform(array: any[]) {
    return array.length;
  }
}
