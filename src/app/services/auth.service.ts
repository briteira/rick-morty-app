import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authChange$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  isAuthenticated() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') == "true";
    return isAuthenticated;
  }

  setAuthenticated(isAuthenticated: boolean) {
    localStorage.setItem('isAuthenticated', isAuthenticated ? "true" : "false");
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

}
