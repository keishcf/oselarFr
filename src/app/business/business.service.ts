import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http:HttpClient) { }

  apiUrl = environment.apiUrl

  getBusinessProfile(businessId: unknown) {
    return this.http.get(`${this.apiUrl}business/biz/${businessId}`)
  }

  addBusinessReview(businessId: string, ReviewData: unknown) {
    return this.http.post(`${this.apiUrl}business/review/${businessId}/write_review/`, ReviewData)
  }

  addToFavorite(businessId: string) {
    return this.http.post(`${this.apiUrl}accounts/pa/profile/${businessId}/add_to_favorite/`, {})
  }

}
