import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionStorage } from 'ngx-webstorage';
import { StoreService } from '../service/store.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private storeService: StoreService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.storeService.get("isLoggedIn") && this.storeService.get("isLoggedIn") != "") {
            console.log(this.storeService.get("isLoggedIn"));
            request = request.clone({
                setHeaders: {
                    'Authorization': `${this.storeService.get("isLoggedIn")}`
                }
            });
        }
        return next.handle(request);
    }
}