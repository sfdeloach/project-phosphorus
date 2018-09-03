import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'half' })
export class HalfPipe implements PipeTransform {
  transform(array: any[]) {
    return array.length / 2;
  }
}
