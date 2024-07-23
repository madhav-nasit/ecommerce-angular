import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle the error here
      if (error) {
        switch (error.status) {
          case 400:
            const message = error?.error?.message
              ? error.error.message
              : 'Status 400: Bad request. Please check your request parameters.';
            toastr.error(message);
            break;
          case 401:
            authService.logout();
            toastr.error('Unauthorized access. Please log in again.');
            break;
          case 403:
            toastr.error('Forbidden. You do not have permission to access this resource.');
            break;
          case 404:
            toastr.error('Resource not found.');
            break;
          case 500:
            toastr.error('Internal server error. Please try again later or contact support.');
            break;
          default:
            toastr.error('Unable to connect to the server. Please try again.');
            break;
        }
      }
      throw error;
    }),
  );
};
