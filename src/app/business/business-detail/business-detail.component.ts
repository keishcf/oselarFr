import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [],
  templateUrl: './business-detail.component.html',
  styleUrl: './business-detail.component.css'
})
export class BusinessDetailComponent {
  @Input() set slug(BizSlug: string) {
    console.log(BizSlug);
  }
}
