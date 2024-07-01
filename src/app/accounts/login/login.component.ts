import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { NgOptimizedImage } from '@angular/common';

import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RippleModule, InputTextModule, PasswordModule, RouterLink, NgOptimizedImage, DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private fb:FormBuilder, private accountsService:AccountsService, private router:Router, private route:ActivatedRoute) {}

  return_url!: string
  getReturnUrl: any

  loginError: string = '';

  ngOnInit(): void {
    this.getReturnUrl = this.route.queryParams.subscribe(params => {
      this.return_url = params['return_url']
    })
  }
  ngOnDestroy(): void {
    this.getReturnUrl.unsubscribe()
  }


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
        if (this.return_url) {
          this.router.navigate([this.return_url])
        } else {
          this.router.navigate(['/profile'])
        }
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
