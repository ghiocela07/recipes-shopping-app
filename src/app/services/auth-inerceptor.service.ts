import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userSubject
            .pipe(
                take(1),
                exhaustMap(userSubject => {
                    const token = userSubject?.token ? userSubject.token : '';
                    const modifiedRequest = request.clone(
                        {
                            params: new HttpParams().set('auth', token)
                        }
                    );
                    return next.handle(modifiedRequest);
                }));

    }
}
