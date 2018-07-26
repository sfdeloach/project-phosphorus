import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findDate' })
export class FindDatePipe implements PipeTransform {
  transform(array: any[], fn: string): any {
    const mappedArray = array.map(element => new Date(element).getTime());
    if (fn === 'max') {
      return new Date(Math.max(...mappedArray));
    } else if (fn === 'min') {
      return new Date(Math.min(...mappedArray));
    } else {
      return 0;
    }
  }
}
