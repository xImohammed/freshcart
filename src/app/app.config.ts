import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { base_Url } from './core/custom_injection/api_BaseUrl';
import { headersInterceptor } from './core/Interceptors/headers/headers.interceptor';
import { errorInterceptor } from './core/Interceptors/error/error.interceptor';
import { loadingInterceptor } from './core/Interceptors/loading/loading.interceptor';
import { redirect_Url } from './core/custom_injection/redirect_Url';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorInterceptor,loadingInterceptor])),
    provideAnimations(),
    {
      provide: base_Url,
      useValue:'https://ecommerce.routemisr.com/api/v1/'
    },
    {
      provide:redirect_Url,
      useValue:'freshcart-git-main-ximohammeds-projects.vercel.app'
    },
    provideToastr()
    ,importProvidersFrom(NgxSpinnerModule)
  ]

};
