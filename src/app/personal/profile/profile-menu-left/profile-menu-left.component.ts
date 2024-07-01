import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule} from 'primeng/button'
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-profile-menu-left',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,ButtonModule],
  templateUrl: './profile-menu-left.component.html',
  styleUrl: './profile-menu-left.component.css'
})
export class ProfileMenuLeftComponent {
  menus: any = [
    {
      name: "Overview",
      link: "./overview",
      icon: "overview"
    },
    {
      name: "Reviews",
      link: "./reviews",
      icon: "reviews"
    },
    {
      name: "Favorites",
      link: "./favorites",
      icon: "favorites"
    },
    {
      name: "Question & Answers",
      link: "./question-answers",
      icon: "q&a"
    },
    {
      name: "Collections",
      link: "./collections",
      icon: "collections"
    },
    {
      name: "Followers",
      link: "./followers",
      icon: "followers"
    },
  ]

  showMobileMenu = false

  showMobileMenuToggle() {
    this.showMobileMenu = !this.showMobileMenu
    console.log(this.showMobileMenu)
  }
}
