import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-type', 'application/json');
    const cloneReq = req.clone({ headers });
    return next.handle(cloneReq);
  }
}
