import { inject, Input, input } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BusinessService } from './business.service';
import { switchMap, tap } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { AccountsService } from '../accounts/accounts.service';

export const businessResolver: ResolveFn<object> = (route, state) => {

  let routeStatus: boolean = false
  let slug = route.paramMap.get('slug')?.toString()
  const businessService = inject(BusinessService)
  const accountService = inject(AccountsService)
  const returnedData = accountService.getLoggedInUser().pipe(switchMap((user) => {
    if (user) {
      routeStatus = true
    }
    return businessService.getBusinessProfile(slug)
  }))
  return returnedData
};
