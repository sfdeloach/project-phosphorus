import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findNumber' })
export class FindNumberPipe implements PipeTransform {
  transform(array: number[], fn: string): number {
    return fn ? Math[fn](...array) : undefined;
  }
}
