import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbriviateNumber',
  standalone: true
})
export class AbbriviateNumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let suffixes = ['', 'K', 'M', 'B']
    if (value < 1000) {
      return value;
    }

    const exp = Math.floor(Math.log(value) / Math.log(1000));
    const abbreviated = value / Math.pow(1000, exp);

    // Round down to 1 decimal place
    const rounded = Math.floor(abbreviated * 10) / 10;

    // If the rounded value is an integer, remove the decimal point
    const formattedValue = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);

    return formattedValue + suffixes[exp];
  }

}
