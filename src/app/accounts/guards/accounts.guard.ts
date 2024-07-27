import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const accountServices = inject(AccountsService)
  const router = inject(Router)


  if (accountServices.isAuthenticated()) {
    return true
  } else {
    router.navigate(['/login'])
    return false;
  }
};

export const isAnonymousGuard: CanActivateFn = (route, state) => {

  const accountServices = inject(AccountsService)
  const router = inject(Router)
  if (!accountServices.isAuthenticated()) {
    return true
  } else {
    router.navigate(['/profile'])
    return false;
  }
};

export const isAnonymousChildGuard: CanActivateChildFn = (childRoute, state) => {

  const accountServices = inject(AccountsService)
  const router = inject(Router)
  if (!accountServices.isAuthenticated()) {
    return true
  } else {
    router.navigate(['/profile'])
    return false;
  }
};

export const isAuthenticatedChildGuard: CanActivateChildFn = (childRoute, state) => {
  const accountServices = inject(AccountsService)
  const router = inject(Router)


  if (accountServices.isAuthenticated()) {
    return true
  } else {
    router.navigate(['/login'])
    return false;
  }
}

