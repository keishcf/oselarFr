import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true
})
export class RoundPipe implements PipeTransform {

  transform(value: number, decimalPlaces: number = 0): unknown {
    const factor = Math.pow(10, decimalPlaces)
    return Math.round(value * factor) / factor
  }

}
