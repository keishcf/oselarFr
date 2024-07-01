import { Routes} from '@angular/router'

export const ProfileMenuRoutes: Routes = [
  {path: 'overview', loadComponent: () => import('./profile-menu-components/profile-over-view/profile-over-view.component').then(c => c.ProfileOverViewComponent)},
  {path: 'reviews', loadComponent: () => import('./profile-menu-components/profile-reviews/profile-reviews.component').then(c => c.ProfileReviewsComponent)},
]
