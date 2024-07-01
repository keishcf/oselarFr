import { Directive } from '@angular/core';

@Directive({
  selector: '[appUrl]',
  standalone: true
})
export class UrlDirective {

  constructor() { }

}
