import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './accounts/login/login.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { ResetPasswordComponent } from './accounts/passwords/reset-password/reset-password.component';
import { SignupCheckEmailInfoComponent } from './accounts/signup-check-email-info/signup-check-email-info.component';
import { VerifyEmailComponent } from './accounts/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { isAnonymousGuard, isAuthenticatedGuard } from './accounts/guards/accounts.guard';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
  {path: 'login', component: LoginComponent, title: 'Login - Oselar', canActivate: [isAnonymousGuard]},
  {path: 'signup', children: [
    {path: '', component: SignUpComponent, title: 'Sign Up - Oselar'},
    {path: 'check_email', component: SignupCheckEmailInfoComponent, title: 'Check Email - Oselar'},
    {path: 'verify', component:VerifyEmailComponent, title: 'Verify Email - Oselar'},
  ]},
  {path: 'dashboard', component: DashboardComponent, title: "dasbboard oselar", canActivate: [isAuthenticatedGuard]},
  {path: '**', component: NotFoundComponent, title: 'Page Not Found - Oselar'}
];
