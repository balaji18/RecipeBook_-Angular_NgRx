import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducers';
import * as authActions from '../auth/store/auth.actions';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  //  user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }
    // onSignUp(email: string, password: string) {
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         })
    //         .pipe(catchError(this.handleError), tap(resData => {
    //             this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    //         }));
    // }

    // login(email: string, password: string) {
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey ,
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }).pipe(catchError(this.handleError), tap(resData => {
    //             this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    //         }
    //         ));

    // }

    // autoLogin() {
    //     const userData: {
    //         email: string,
    //         id: string,
    //         _token: string,
    //         _tokenExpirationDate: string
    //     } = JSON.parse(localStorage.getItem('userData'));
    //     if (!userData) {
    //         return;
    //     }
    //     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    //     if (loadedUser.token) {
    //        // this.user.next(loadedUser);

    //        this.store.dispatch(new authActions.AuthenticateSuccess(
    //            {email: loadedUser.email,
    //             userId: loadedUser.id,
    //             token: loadedUser.token,
    //             expirationDate: new Date(userData._tokenExpirationDate)}
    //             ));
    //         const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //         this.autoLogout(expirationDuration);
    //     }
    // }

    // logout() {
    //     // this.user.next(null);
    //     this.store.dispatch(new authActions.Logout());

    //    // this.router.navigate(['/auth']);

    //    localStorage.removeItem('userData');
    //     if (this.tokenExpirationTimer) {
    //         clearTimeout(this.tokenExpirationTimer);
    //     }
    //     this.tokenExpirationTimer = null;
    // }

    // autoLogout(expirationDuration: number) {
    //     console.log('expirationDuration', expirationDuration);
    //     this.tokenExpirationTimer = setTimeout(() => {
    //         this.logout();
    //     }, expirationDuration);
    // }

    // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //     const user = new User(email, userId, token, expirationDate);
    //    // this.user.next(user);
    //    this.store.dispatch(new authActions.AuthenticateSuccess(
    //         {email: email,
    //         userId: userId,
    //         token: token, 
    //         expirationDate: expirationDate}
    //        ));
    //     this.autoLogout(expiresIn * 1000);
    //     localStorage.setItem('userData', JSON.stringify(user));
    // }

    // private handleError(error: HttpErrorResponse) {
    //     let errorMessage = 'An Unknown error occured';
    //     if (!error.error || !error.error.error) {
    //         return throwError(errorMessage);
    //     }
    //     switch (error.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'This email exists already';
    //             break;
    //         case 'EMAIL_NOT_FOUND':
    //             errorMessage = 'This email doesnot exists';
    //             break;
    //         case 'INVALID_PASSWORD':
    //             errorMessage = 'The password is not correct';
    //             break;
    //     }
    //     return throwError(errorMessage);
    // }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new authActions.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}

