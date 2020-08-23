import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AsyncDatabase, IndexedDB } from '@ezzabuzaid/document-storage';
import { RequestOptionsModule } from '@ezzabuzaid/ngx-request-options';
import { IRequestOptions } from '@shared/common';
import {
  LoggerInterceptor,
  ProgressInterceptor,
  SetupInterceptor,
  TeardownInterceptor, UniversalInterceptor, UrlInterceptor
} from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    RequestOptionsModule.forRoot<IRequestOptions>({
      DEFAULT_URL: true,
      SNACKBAR: false,
      PROGRESS_BAR: true,
      FORM_PROGRESS_BAR: true,
      FULL_RESPONSE: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetupInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TeardownInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
