import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CurrentUser } from './accounts';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  // AuthenticatedUser

  apiUrl = environment.apiUrl

  private currentUserSubject!: BehaviorSubject<CurrentUser>
  public currentUser!: Observable<CurrentUser>

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    // if (this.isAuthenticated()) {
    //   this.getLoggedInUser()
    // }
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated
    return !!localStorage.getItem('token');
  }

  login( credentials: unknown) {
    return this.http.post(`${this.apiUrl}accounts/login/`,  credentials).pipe(tap((response: any) => {
      if (response.token) {
        this.setToken(response.token)
        this.getLoggedInUser().subscribe()
      }
    }))
  }

  logout() {

    return this.http.get(`${this.apiUrl}accounts/logout/`).pipe(tap(() => {
      this.removeAuthToken()
      this.setCurrentUser(null)
    }))
  }

  signup(credentials:unknown) {
    return this.http.post(`${this.apiUrl}accounts/signup/`, credentials)
  }

  getUserProfile(id?: string) {
    var profileUrl = `${this.apiUrl}accounts/pa/profile`
    if (id) {
      profileUrl = `${this.apiUrl}accounts/pa/profile/${id}`
    }
    return this.http.get(profileUrl)
  }

  VerifyEmail(code: any) {
    return this.http.get(`${this.apiUrl}accounts/signup/verify/?code=${code}`)
  }

  getLoggedInUser() {
    return this.http.get(`${this.apiUrl}accounts/users/me`).pipe(tap((user: any) => {
      this.setCurrentUser(user)
    }))
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  public setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }


  setToken(code: string) {
    localStorage.setItem("token", code)  }

  getAuthToken() {

    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      // Fallback mechanism if localStorage is not available
      return null;
    }
  }

  removeAuthToken() {
    localStorage.removeItem("token")
  }


  updateUserProfile(data: any) {
    return this.http.patch(`${this.apiUrl}accounts/pa/profile/change_profile/`, data)
  }

  updateAccount(data: any) {
    return this.http.post(`${this.apiUrl}accounts/users/me`, data)
  }

  updateAccountPassword(data: any) {
    return this.http.post(`${this.apiUrl}accounts/password/change/`, data)
  }

  updateAccountEmail(data: any) {
    return this.http.post(`${this.apiUrl}accounts/email/change/`, data)
  }
  updateAccountEmailVerify(code: string) {
    return this.http.get(`${this.apiUrl}accounts/email/change/verify/?code=${code}`,)
  }



}
