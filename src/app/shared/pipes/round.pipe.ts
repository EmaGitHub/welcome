import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  constructor() {
  }

  transform(value: number): string {
    return value.toFixed(2).replace(/\.00$/, '');
  }

}
