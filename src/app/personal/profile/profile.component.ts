import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar'
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { AccountsService } from '../../accounts/accounts.service';
import { CommonModule } from '@angular/common';

import { combineLatest, Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UrlPipe } from '../../pipes/url.pipe';
import { MeterGroupModule } from 'primeng/metergroup'
import { ProfileMenuLeftComponent } from './profile-menu-left/profile-menu-left.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarModule, ButtonModule, CommonModule, RouterLink, UrlPipe, SkeletonModule, ProfileMenuLeftComponent, RouterOutlet, MeterGroupModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private accountService:AccountsService) {}
  @Input() userId!: string
  UserProfile: any = {}
  loadingProfile = true



  visible: boolean = false;
  profileUpdateForm!: FormGroup

  ngOnInit(): void {
    if(this.userId) {
      this.accountService.getUserProfile(this.userId).subscribe({
        next: (user) => {
          this.UserProfile = user
          this.loadingProfile = false
        },
      })
    } else {
      this.accountService.getUserProfile().subscribe({
        next: user => {
          this.UserProfile = user
          this.loadingProfile = false
        }
      })
    }

  }

}
