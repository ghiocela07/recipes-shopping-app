import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';



export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    userSubject = new BehaviorSubject<User | undefined>(undefined);
    token: string | undefined;
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    singUp(email: string, password: string): Observable<AuthResponseData> {
        const singUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDINuQ3NwJQxnAM54ZWrH-LfSlsw8rSCU';

        return this.http.post<AuthResponseData>(singUpUrl, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        );

    }

    autoLogin(): void {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            return;
        }
        const user: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string

        } = JSON.parse(userData);

        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        if (loadedUser.token) {
            this.userSubject.next(loadedUser);
            const expDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expDuration);
        }
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        const loginUrl =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDINuQ3NwJQxnAM54ZWrH-LfSlsw8rSCU';

        return this.http.post<AuthResponseData>(loginUrl, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }));
    }

    logout(): void {
        this.userSubject.next(undefined);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number): void {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.userSubject.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(responseError: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error ocurred.';
        if (!responseError.error || !responseError.error.error) {
            return throwError(errorMessage);
        }
        switch (responseError.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid.';
                break;
        }

        return throwError(errorMessage);
    }
}
