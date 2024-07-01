import { Component, Input, OnInit, signal } from '@angular/core';
import { PersonalService } from '../../../personal.service';
import { AccountsService } from '../../../../accounts/accounts.service';
import { switchMap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton'
import { CommonModule } from '@angular/common';
import { UserReviewComponent } from './user-review/user-review.component';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
  selector: 'app-profile-reviews',
  standalone: true,
  imports: [UserReviewComponent, SkeletonModule, CommonModule, PaginatorModule],
  templateUrl: './profile-reviews.component.html',
  styleUrl: './profile-reviews.component.css'
})
export class ProfileReviewsComponent implements OnInit {

  @Input() userId!: string
  constructor(private personalServices: PersonalService, private accountServices:AccountsService) {}

  first: number = 0;

  rows: number = 10;



  reviewsLoading = signal(true)

  userReviews: any
  reviewsPaginationData: any

  ngOnInit(): void {
    if (!this.userId) {
     this.accountServices.getLoggedInUser().pipe(switchMap(userData => this.personalServices.getUserReviews(userData.id))).subscribe({
        next: (reviews: any) => {
          this.setUserReview(reviews.results)
        },
      })
    } else {
      this.personalServices.getUserReviews(this.userId).subscribe({
        next: (reviews: any) => {
          this.setUserReview(reviews.results)
        },
      })
    }
  }

  setUserReview(reviews: any) {
    this.userReviews = reviews
    this.reviewsPaginationData = {
      "count": reviews.count,
      "next": reviews.next,
      "previous": reviews.previous
    }
    this.reviewsLoading.set(false)

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
