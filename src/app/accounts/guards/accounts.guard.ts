import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const accountServices = inject(AccountsService)
  const router = inject(Router)


  if (accountServices.getAuthToken() != null) {
    return true
  } else {
    router.navigate(['/login'])
    return false;
  }
};

export const isAnonymousGuard: CanActivateFn = (route, state) => {

  const accountServices = inject(AccountsService)
  const router = inject(Router)
  if (!accountServices.getAuthToken()) {
    return true
  } else {
    router.navigate(['/dashboard'])
    return false;
  }
};

