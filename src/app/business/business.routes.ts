import { Routes } from '@angular/router'
import { BusinessProfileComponent } from './business-profile/business-profile.component'
import { BusinessService } from './business.service'
import { businessResolver } from './business.resolver'
import { WriteReviewComponent } from './write-review/write-review.component'


export const BusinessRoutes: Routes = [
  {path: '', component: BusinessProfileComponent, title: 'Business Detail - Oselar'},
  {path: 'review-business', loadComponent: () => import('./write-review/write-review.component').then(m => m.WriteReviewComponent), title: 'Write a Review - Oselar'},
]
