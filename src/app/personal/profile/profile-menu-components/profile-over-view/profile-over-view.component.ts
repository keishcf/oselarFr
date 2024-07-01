import { Component, Input, OnInit } from '@angular/core';
import { AccountsService } from '../../../../accounts/accounts.service';
import { switchMap } from 'rxjs';
import { RoundPipe } from '../../../../pipes/round.pipe';
import { SkeletonModule } from 'primeng/skeleton'
import { CommonModule } from '@angular/common';
import { PersonalService } from '../../../personal.service';

@Component({
  selector: 'app-profile-over-view',
  standalone: true,
  imports: [RoundPipe, SkeletonModule, CommonModule],
  templateUrl: './profile-over-view.component.html',
  styleUrl: './profile-over-view.component.css'
})
export class ProfileOverViewComponent implements OnInit {
  constructor(private accountsService:AccountsService, private personalService:PersonalService) {}
  UserStatistics:any
  UserStatisticsSkeleton:boolean = true

  ratingDistrubation: any[] = [
    { label: '5', value: 1 },
    { label: '4', value: 50 },
    { label: '3', value: 4 },
    { label: '2', value: 2 },
    { label: '1', value: 0 },
  ];
  ratingDistrubationSkeleton = true

  @Input() userId!: string
  setUserStatistics(value: any) {
    this.UserStatistics = {
      "reactions":value.reactions,
      "reviewsTotal":value.totalReviewsNumber,
    }
    this.UserStatisticsSkeleton = false
  }
  setRatingDistrubation(value: any) {
    this.ratingDistrubation = [
      { label: '5', value: value.rating.FiveStar != 0 ? value.rating.FiveStar * 100 / value.totalReviewsNumber: 0 },

      { label: '4', value: value.rating.FourStar != 0 ? value.rating.FourStar * 100 / value.totalReviewsNumber : 0 },
      { label: '3', value: value.rating.ThreeStar != 0 ? value.rating.ThreeStar * 100 / value.totalReviewsNumber: 0 },
      { label: '2', value: value.rating.TwoStar != 0 ? value.rating.TwoStar * 100 / value.totalReviewsNumber: 0 },
      { label: '1', value: value.rating.OneStar != 0 ? value.rating.OneStar * 100 / value.totalReviewsNumber: 0 },
    ]
    this.ratingDistrubationSkeleton = false
  }

  ngOnInit(): void {
    if (this.userId != undefined) {
      this.personalService.getUserStatistics(this.userId).subscribe({
        next: (value: any) => {
          this.setUserStatistics(value)
          this.setRatingDistrubation(value)
        },
      })
    } else {
      this.accountsService.getLoggedInUser().pipe(
        switchMap((userdata) => this.personalService.getUserStatistics(userdata.id))
      ).subscribe({
        next: (value: any) => {
          this.setUserStatistics(value)
          this.setRatingDistrubation(value)

        },
      })
    }
  }
}
