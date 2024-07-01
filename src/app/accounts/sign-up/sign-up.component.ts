import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RippleModule, InputTextModule, PasswordModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private fb:FormBuilder, private accountService: AccountsService, private route:ActivatedRoute, private router:Router ) {
  }



  signError: string = '';

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$')]
  })
  get firstName() {
    return this.signupForm.get('firstName')
  }
  get lastName() {
    return this.signupForm.get('lastName')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get password() {
    return this.signupForm.get('password')
  }

  signup() {
    let data = {
      email: this.signupForm.value.email,
      first_name: this.signupForm.value.firstName,
      last_name: this.signupForm.value.lastName,
      password: this.signupForm.value.password,
    }
    this.accountService.signup(data).subscribe({
      next: (response) => {
        this.router.navigate(['check_email'], {relativeTo: this.route})
      },
      error: (error) => {
        if (error.status === 0) {
          this.signError = 'Network Error Occurred'
        } else if (error.status === 400) {
          this.signError = 'An account with this email already exists.'
        } else {
          this.signError = 'An error occurred. Please try again later.'
        }
      }
    })
  }
}
