import { Component, Input, OnInit, signal } from '@angular/core';
import { PersonalService } from '../../../personal.service';
import { AccountsService } from '../../../../accounts/accounts.service';
import { switchMap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton'
import { CommonModule } from '@angular/common';
import { UserReviewComponent } from './user-review/user-review.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}


@Component({
  selector: 'app-profile-reviews',
  standalone: true,
  imports: [UserReviewComponent, SkeletonModule, CommonModule, PaginatorModule,ButtonModule],
  templateUrl: './profile-reviews.component.html',
  styleUrl: './profile-reviews.component.css'
})
export class ProfileReviewsComponent implements OnInit {
  constructor(private personalServices: PersonalService, private accountServices:AccountsService) {}

  @Input() userId!: string

  nextUrl: string | null = null;
  previousUrl: string | null = null;

  reviewsLoading = signal(true)

  userReviews: any
  reviewsPaginationData: any
  loadingMore = false

  ngOnInit(): void {
    this.loadReviews()
  }

  loadReviews(url?: string) {
    if (!this.userId) {
      this.accountServices.getLoggedInUser().pipe(switchMap(userData => this.personalServices.getUserReviews(userData.id, url))).subscribe({
        next: (reviews: any) => {
          this.setUserReview(reviews)
        },
      })
    }
    if (this.userId) {
      this.personalServices.getUserReviews(this.userId, url).subscribe({
        next: (reviews: any) => {

          this.setUserReview(reviews)
        },
      })
    }
  }

  loadMore(): void {
    this.loadingMore = true
    if (this.nextUrl) {
      this.personalServices.getUserReviews(this.userId, this.nextUrl)
        .subscribe((reviews: any) => {
          this.loadingMore = false
          this.userReviews.push(...reviews.results); // append new results
          this.nextUrl = reviews.next; // update the next URL for further pagination
        });
    }
  }


  setUserReview(reviews: any) {
    this.nextUrl = reviews.next
    this.previousUrl = reviews.previous
    this.userReviews = reviews.results
    this.reviewsLoading.set(false)
    this.reviewsPaginationData = {
      "count": reviews.count,
      "next": reviews.next,
      "previous": reviews.previous
    }
  }
}
