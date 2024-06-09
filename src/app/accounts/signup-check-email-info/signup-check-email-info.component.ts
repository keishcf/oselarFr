import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-check-email-info',
  standalone: true,
  imports: [],
  templateUrl: './signup-check-email-info.component.html',
  styleUrl: './signup-check-email-info.component.css'
})
export class SignupCheckEmailInfoComponent {
  constructor(private router:Router) {}

}
