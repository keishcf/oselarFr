import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { AccountsService } from '../../../accounts/accounts.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private accountService:AccountsService, private fb:FormBuilder) { }

  accountForm!: FormGroup

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
    })
  }

  updateAccount() {
    this.accountService.updateAccount(this.accountForm.value).pipe(first()).subscribe({
      next: () => {
        console.log('Account updated')
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
