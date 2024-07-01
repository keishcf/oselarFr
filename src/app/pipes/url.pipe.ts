import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url',
  standalone: true
})
export class UrlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const pattern = /https?:\/\/(?:www\.)?(.*?)\b(?:\/|$)/
    const match = value.match(pattern);
    return match ? match[1] : ''
  }

}

