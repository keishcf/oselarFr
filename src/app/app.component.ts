import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button'
import { AccountsService } from './accounts/accounts.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [AccountsService]
})
export class AppComponent implements OnInit {
  constructor(private accountsServices:AccountsService) {}
  getUser$!: any
  userisAu: boolean = false

  ngOnInit(): void {
    if (this.accountsServices.isAuthenticated()) {
      this.getUser$ = this.accountsServices.getLoggedInUser().subscribe()
    }
  }
}
