import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CurrentUser } from './accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  // AuthenticatedUser

  apiUrl = environment.apiUrl

  private currentUserSubject!: BehaviorSubject<CurrentUser>
  public currentUser!: Observable<CurrentUser>
  userIsAuthenticated = signal(false)

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login( credentials: unknown) {
    return this.http.post(`${this.apiUrl}accounts/login/`,  credentials)
  }

  logout() {
    this.removeAuthToken()
    return this.http.get(`${this.apiUrl}accounts/logout/`)
  }

  signup(credentials:unknown) {
    return this.http.post(`${this.apiUrl}accounts/signup/`, credentials)
  }

  VerifyEmail(code: any) {
    return this.http.get(`${this.apiUrl}accounts/signup/verify/?code=${code}`)
  }

  getLoggedInUser() {
    return this.http.get(`${this.apiUrl}accounts/users/me`)
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  public setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }



  setToken(code: string) {
    localStorage.setItem("token", code)
    this.userIsAuthenticated.set(true)
  }

  getAuthToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      // Fallback mechanism if localStorage is not available
      return null;
    }
  }

  removeAuthToken() {
    this.userIsAuthenticated.set(false)
    localStorage.removeItem("token")
  }


}
