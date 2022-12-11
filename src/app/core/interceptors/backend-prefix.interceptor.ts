import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'Env';
import { Observable } from 'rxjs';

/**
 * Prefixes all requests with api address.
 */
@Injectable()
export class BackendPrefixInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith('/')) {
      const changedRequest = request.clone({
        url: environment.backendUrl + request.url,
      });
      return next.handle(changedRequest);
    }

    return next.handle(request);
  }
}
