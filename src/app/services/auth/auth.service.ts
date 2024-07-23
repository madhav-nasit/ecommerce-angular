import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignInReq, SignUpReq, User } from '../../types';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { storage } from '../../utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.user.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const appSession = storage.getItem('appSession');
    if (!!appSession?.user) {
      this.user.next(JSON.parse(appSession?.user));
    }
  }

  get token() {
    const appSession = storage.getItem('appSession');
    return appSession?.token;
  }

  get profile() {
    const appSession = storage.getItem('appSession');
    return appSession?.user ? { ...JSON.parse(appSession?.user), token: undefined } : undefined;
  }

  signIn(signInReq: SignInReq) {
    return this.http.post<User>(environment.apiUrl + 'auth/sign-in', signInReq).pipe(
      map((response) => {
        if (response?.token) {
          this.user.next(response);
          storage.setItem('appSession', {
            user: JSON.stringify({ ...response, token: undefined }),
            token: response?.token,
          });
        }
        return response;
      }),
    );
  }

  signUp(signUpReq: SignUpReq) {
    return this.http.post<User>(environment.apiUrl + 'auth/sign-up', signUpReq).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  getProfile() {
    return this.http.get<User>(environment.apiUrl + 'auth/profile').pipe(
      map((response) => {
        this.user.next(response);
        return response;
      }),
    );
  }

  isAuthenticated() {
    const appSession = storage.getItem('appSession');
    return !!appSession?.token;
  }

  logout() {
    storage.removeItem('appSession');
    this.router.navigateByUrl('/auth/signin');
  }
}
