import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticatedSubject = new BehaviorSubject<any>(this.getUser());

  authChange$ = this.userAuthenticatedSubject.asObservable();

  constructor() { }

  isAuthenticated() {
    const user = localStorage.getItem('user');
    return user ? true : false;
  }

  getUser(): UserModel | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(user: any) {
    const userWithoutPassword = { ...user, password: undefined };
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    this.userAuthenticatedSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.userAuthenticatedSubject.next(null);
  }

}
