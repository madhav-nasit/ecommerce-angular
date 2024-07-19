import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authenticate(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
