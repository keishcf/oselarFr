import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar'
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-business-review',
  standalone: true,
  imports: [CommonModule, AvatarModule, RatingModule, FormsModule, OverlayPanelModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class BUsinessReviewComponent {

  review = input<any>()

  value = 3;
  togglePopupShow = false
  togglePopup() {
    this.togglePopupShow = !this.togglePopupShow
    console.log('togglePopupShow', this.togglePopupShow)
  }
}
