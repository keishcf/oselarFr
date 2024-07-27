import { Routes } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { ResetPasswordComponent } from './accounts/passwords/reset-password/reset-password.component';
import { SignupCheckEmailInfoComponent } from './accounts/signup-check-email-info/signup-check-email-info.component';
import { VerifyEmailComponent } from './accounts/verify-email/verify-email.component';
import { isAnonymousChildGuard, isAnonymousGuard, isAuthenticatedChildGuard, isAuthenticatedGuard } from './accounts/guards/accounts.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordVerifyComponent } from './accounts/passwords/reset-password-verify/reset-password-verify.component';
import { ProfileSettingsComponent } from './personal/settings/profile-settings/profile-settings.component';
import { businessResolver } from './business/business.resolver';


export const routes: Routes = [
  { path: 'biz/:slug', loadChildren: () => import('./business/business.routes').then(r => r.BusinessRoutes), resolve: {profile: businessResolver}},
  {path: 'login', component: LoginComponent, title: 'Login - Oselar', canActivate: [isAnonymousGuard]},
  {path: 'profile', loadComponent: () => import('./personal/personal.component').then(p => p.PersonalComponent), loadChildren: () => import('./personal/personal.routes').then(m => m.PersonalRoutes)},
  {path: 'reset', children: [
    {path: 'password', component: ResetPasswordComponent, title: 'Reset Password - Oselar'},
    {path: 'password/verify', component: ResetPasswordVerifyComponent, title: 'Verifiy Reset Password - Oselar'},

  ], canActivateChild: [isAnonymousChildGuard]},
  {path: 'signup', children: [
    {path: '', component: SignUpComponent, title: 'Sign Up - Oselar'},
    {path: 'check_email', component: SignupCheckEmailInfoComponent, title: 'Check Email - Oselar'},
    {path: 'verify', component:VerifyEmailComponent, title: 'Verify Email - Oselar'},
  ], canActivateChild: [isAnonymousChildGuard]},
  {path: 'settings', loadComponent: () => import('./personal/settings/settings.component').then(c => c.SettingsComponent),loadChildren: () => import('./personal/settings/settings.routes').then((r) => r.SettingsRoutes), canActivateChild: [isAuthenticatedChildGuard]},
  {path: '**', component: NotFoundComponent, title: 'Page Not Found - Oselar'},

];
