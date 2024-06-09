import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { Router, RouterLink } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RippleModule, InputTextModule, PasswordModule, RouterLink, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private fb:FormBuilder, private accountsService:AccountsService, private router:Router) {}

  loginError: string = '';


  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login() {
    this.accountsService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.accountsService.setToken(response.token)
        this.accountsService.userIsAuthenticated.set(true)
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        if (error.status === 0) {
          this.loginError = 'Network Error Occurred'
        } else if (error.status === 401) {
          this.loginError = 'We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.'
        } else {
          this.loginError = 'An error occurred. Please try again later.'
        }

      }
    })
  }

}
