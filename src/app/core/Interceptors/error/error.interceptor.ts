import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService)
  return next(req).pipe( catchError((err)=>
  {
    if(!req.url.includes('/login') && req.url.includes('/register')){
      toastr.error(err.error.message)
    }
   
    return throwError(()=>err)
  }
  ))
};
