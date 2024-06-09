import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountsService } from './accounts.service';
import { catchError, throwError } from 'rxjs';
export const accountsInterceptor: HttpInterceptorFn = (req, next) => {
  const accountsServices = inject(AccountsService)

  if (accountsServices.getAuthToken()) {
    const ClonedReq = req.clone({setHeaders: {Authorization: `Token ${accountsServices.getAuthToken()}`}})
    return next(ClonedReq).pipe(catchError((error) => {
      if (error.status === 401 && error.error.detail == "Invalid token.") {
        accountsServices.logout()
      }
      return throwError(() => error)
    }));
  }
  return next(req)

};
