import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize_review_helpful',
  standalone: true
})
export class PluralizeHelpFulReviewPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value == 1 ? 'person' : 'people';
  }

}
