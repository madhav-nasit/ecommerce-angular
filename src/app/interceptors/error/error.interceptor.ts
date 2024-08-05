import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { strings } from '../../constants';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const errorMsg = strings.apiErrors;
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle the error here
      if (error) {
        switch (error.status) {
          case 400:
            const message = error?.error?.message
              ? error.error.message
              : errorMsg.internalServerError;
            toastr.error(message);
            break;
          case 401:
            authService.logout();
            toastr.error(errorMsg.unauthorizedAccess);
            break;
          case 403:
            toastr.error(errorMsg.forbiddenAccess);
            break;
          case 404:
            toastr.error(errorMsg.resourceNotFound);
            break;
          case 500:
            toastr.error(errorMsg.internalServerError);
            break;
          default:
            toastr.error(errorMsg.networkError);
            break;
        }
      }
      throw error;
    }),
  );
};
