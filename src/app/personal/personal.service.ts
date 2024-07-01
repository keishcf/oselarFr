import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http:HttpClient) { }


  apiUrl = environment.apiUrl

  getUserStatistics(userId: string) {
    return this.http.get(`${this.apiUrl}accounts/pa/profile/${userId}/get_user_statistics`,)
  }

  getUserReviews(userId: string) {
    return this.http.get(`${this.apiUrl}accounts/pa/profile/${userId}/user_reviews`)
  }


}

