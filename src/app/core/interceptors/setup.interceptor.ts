import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '@core/helpers/utils';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { Connectivity, IRequestOptions } from '@shared/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SetupInterceptor implements HttpInterceptor {

    constructor(
        private readonly snackbar: MatSnackBar,
        @Inject(PLATFORM_ID) private readonly platformId: any,
        private readonly connectivity: Connectivity,
        private readonly requestData: RequestOptions<IRequestOptions>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformBrowser(this.platformId)) {
            if (this.connectivity.isOffline) {
                this.snackbar.open('Internet connection is not active, please check your connection');
                return of();
            }
        } else {
            return of();
        }

        return next.handle(request)
            .pipe(
                map((response) => {
                    const fullResponse = this.requestData.get(request, 'FULL_RESPONSE');
                    const defaultUrl = this.requestData.get(request, 'DEFAULT_URL');
                    if (response instanceof HttpResponse && defaultUrl && AppUtils.not(fullResponse)) {
                        return response.clone({ body: response.body.data });
                    }
                    return response;
                })
            );
    }


}
