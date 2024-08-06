import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor, errorInterceptor, loggingInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 10000,
      progressBar: true,
      preventDuplicates: true,
    }), // Toastr providers
  ],
};
