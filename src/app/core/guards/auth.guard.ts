import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const AuthGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const _platFormId = inject(PLATFORM_ID)
  if(isPlatformBrowser(_platFormId))
  {
    if(localStorage.getItem('userToken')!== null)
      {
        return true
      }
      else{
        _router.navigate(['/login'])
        return false
      }
  }
  else
  {
    return false
  }

};
