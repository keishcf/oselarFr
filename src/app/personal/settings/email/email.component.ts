import { Component } from '@angular/core';
import { AccountsService } from '../../../accounts/accounts.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, MessagesModule, CommonModule, RouterLink],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
  providers: [MessageService]
})
export class EmailComponent {
  constructor(private accountService:AccountsService, private fb:FormBuilder, private messageService:MessageService) {}

  messages: any

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  updateEmail() {
    let updateMsg = "Success We've sent a verification email to your new email address. Please check your inbox (and your spam/junk folder) and follow the instructions to complete the verification process ."
    this.accountService.updateAccountEmail(this.emailForm.value).subscribe({
      next: () => {
        this.messages = [
            { severity: 'success', detail:updateMsg },
        ];
        this.emailForm.reset()
      },
      error: (err) => {
        this.messages = [
            { severity: 'error', detail:err.error.detail },
        ];
      }
    })
  }

}
