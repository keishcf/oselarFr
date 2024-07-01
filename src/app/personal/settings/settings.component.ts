import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import  { AvatarModule } from 'primeng/avatar'
import { combineLatest } from 'rxjs';
import { AccountsService } from '../../accounts/accounts.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet, AvatarModule, CommonModule, RouterLink, RouterLinkActive, ToastModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  constructor(private accountService:AccountsService) {}

  menus: any = [
    {
      name: "Public Profile",
      link: "./profile",
      icon: "profile"
    },
    {
      name: "Account",
      link: "./account",
      icon: "account"
    },
    {
      name: "Password",
      link: "./password",
      icon: "lock"
    },
    {
      name: "Email",
      link: "./email",
      icon: "email"
    }
  ]

  showMobileMenu = false

  showMobileMenuToggle() {
    this.showMobileMenu = !this.showMobileMenu
    console.log(this.showMobileMenu)
  }

  loggedInUser: any = {}

  ngOnInit(): void {
    let joined = combineLatest([this.accountService.getCurrentUser(), this.accountService.getUserProfile()])
    joined.subscribe({
      next: ([loggedUser, userProfile]) => {
        this.loggedInUser = {
          'user': loggedUser,
          'profile': userProfile
        }
      },
      error: err => {
          console.log(err)
      },
    })
  }

}
