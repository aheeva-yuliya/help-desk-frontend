import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: TokenStorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept', this.auth.getToken());
    const paramReq = request.clone({
      headers: request.headers.set(
        'Authorization', `Bearer ${this.auth.getToken()}`)
    });
    console.log(paramReq);
    return next.handle(paramReq);
  }
}