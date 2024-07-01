import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { isAuthenticatedGuard } from '../accounts/guards/accounts.guard';

export const PersonalRoutes: Routes = [
  {path: '', component: ProfileComponent, title: 'User Profile - Oselar', loadChildren: () => import('./profile/profile.routes').then(p => p.ProfileMenuRoutes)},
  {path: ':userId', component: ProfileComponent, title: 'User Profile - Oselar', loadChildren: () => import('./profile/profile.routes').then(p => p.ProfileMenuRoutes)},
];
