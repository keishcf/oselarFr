import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar'
import { map, Observable, tap } from 'rxjs';
import { BusinessService } from '../business.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BusinessData } from '../business';
import { UrlPipe } from '../../pipes/url.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [AvatarModule, CommonModule, FormsModule, RatingModule, UrlPipe, RouterLink],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.css',
  providers: [MessageService]
})
export class BusinessProfileComponent implements OnInit {

  constructor(private businessServices: BusinessService, private route:ActivatedRoute, private messageService: MessageService) {}

  BusinessData$!: Observable<BusinessData>
  MarkedFavorite!: boolean | null

  ngOnInit(): void {
    this.BusinessData$ = this.route.data.pipe(map((data: any) => data['profile']), tap(data => this.MarkedFavorite = data.profile.user_favorite))
    console.log(this.MarkedFavorite)
  }

  addToFavorite(businessId: string) {
    console.log(this.MarkedFavorite)
    this.businessServices.addToFavorite(businessId).subscribe({
      next: data => {
        this.MarkedFavorite = !this.MarkedFavorite
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Business review to favorite' });
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
