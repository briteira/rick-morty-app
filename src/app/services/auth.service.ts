import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') == "true";
    return isAuthenticated;
  }

  setAuthenticated(isAuthenticated: boolean) {
    localStorage.setItem('isAuthenticated', isAuthenticated ? "true" : "false");
  }

}
