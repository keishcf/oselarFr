import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountsService } from './accounts.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const accountsInterceptor: HttpInterceptorFn = (req, next) => {
  const accountsServices = inject(AccountsService);
  const router = inject(Router);

  // Retrieve the token once
  const token = accountsServices.getAuthToken();


  // Clone request with authorization header if token exists
  const clonedReq = token ?
    req.clone({ setHeaders: { Authorization: `Token ${token}` } }) :
    req;

  console.log('Retrieved Token on Page Load:', token);
  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const currentUrl = window.location.href;
        accountsServices.removeAuthToken();
        router.navigate(['login'], { queryParams: { next: currentUrl } });
      }
      return throwError(() => error);
    })
  );
};

