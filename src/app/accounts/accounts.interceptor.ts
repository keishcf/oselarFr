import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountsService } from './accounts.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
export const accountsInterceptor: HttpInterceptorFn = (req, next) => {
  const accountsServices = inject(AccountsService)
  const router = inject(Router)


  if (accountsServices.getAuthToken()) {
    const ClonedReq = req.clone({setHeaders: {Authorization: `Token ${accountsServices.getAuthToken()}`}})
    return next(ClonedReq).pipe(catchError((error) => {
      if (error.status === 401 && error.error.detail == "Invalid token.") {
        const currentUrl = window!.location.href
        accountsServices.removeAuthToken()
        router.navigate(['login'], {queryParams: {next: currentUrl}})
      }
      return throwError(() => error)
    }));
  }
  return next(req).pipe(catchError((error) => {
      if (error.status === 401 && error.statusText == "Unauthorized") {
        const currentUrl = window!.location.href
        accountsServices.removeAuthToken()
        router.navigate(['login'], {queryParams: {next: currentUrl}})

      }
      return throwError(() => error)
    }));

};
