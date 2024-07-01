import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar'
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccountsService } from '../../../../../accounts/accounts.service';

@Component({
  selector: 'app-user-review',
  standalone: true,
  imports: [CommonModule, AvatarModule, RatingModule, FormsModule, OverlayPanelModule],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css'
})
export class UserReviewComponent implements OnInit {
  constructor(private accountService:AccountsService) { }
  @Input() review:any

  value = 3;
  userId!: string
  togglePopupShow = false
  togglePopup() {
    this.togglePopupShow = !this.togglePopupShow
    console.log('togglePopupShow', this.togglePopupShow)
  }

  ngOnInit(): void {
    if (this.accountService.isAuthenticated()) {
      this.accountService.currentUser.subscribe((user) => {
        this.userId = user.id
      })
    }
    console.log(this.userId)
  }
}
