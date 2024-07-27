import { CommonModule } from '@angular/common';
import { Component, effect, Input, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar'
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccountsService } from '../../../../../accounts/accounts.service';
import { PluralizeHelpFulReviewPipe } from '../../../../../pipes/pluralize.pipe';
import { AbbriviateNumberPipe } from '../../../../../pipes/abbriviate-number.pipe';
import { PersonalService } from '../../../../personal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-review',
  standalone: true,
  imports: [CommonModule, AvatarModule, RatingModule, FormsModule, OverlayPanelModule, PluralizeHelpFulReviewPipe, AbbriviateNumberPipe, RouterLink],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css'
})
export class UserReviewComponent implements OnInit {
  constructor(private accountService:AccountsService, private personalService: PersonalService) { }
  @Input() review:any


  user_marked_helpful!:boolean
  userIsAuthenticated = this.accountService.isAuthenticated()
  helpful_count = signal(0)
  value = 3;
  userId!: string
  togglePopupShow = false
  togglePopup() {
    this.togglePopupShow = !this.togglePopupShow
  }

  ngOnInit(): void {
    if (this.accountService.isAuthenticated()) {
      this.accountService.currentUser.subscribe((user) => {
        this.userId = user.id
        this.user_marked_helpful = this.review.user_marked_helpful
        this.helpful_count.set(this.review.helpful_count)
      })
    }
  }

  MarkAsHelpful() {
    this.personalService.setUserReviewHelpful(this.review.id).subscribe({
      next: (response) => {
        this.user_marked_helpful = !this.user_marked_helpful
        if (this.user_marked_helpful) {
          this.helpful_count.update(value => value + 1)
        } else {
          this.helpful_count.update(value => value - 1)
        }
      },
      error: (error) => {
        console.log('error', error)
      }
    })
  }
}
