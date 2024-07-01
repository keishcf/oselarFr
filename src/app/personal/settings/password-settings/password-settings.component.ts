import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { PasswordModule } from 'primeng/password'
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AccountsService } from '../../../accounts/accounts.service';
import { MessagesModule } from 'primeng/messages';
import { RouterLink } from '@angular/router';

export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirm_password = control.get('confirm_password');
  if (!password || !confirm_password) return null;
  return password.value === confirm_password.value ? null : { 'passwordMatch': true };
}

@Component({
  selector: 'app-password-settings',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule, CommonModule, MessagesModule, RouterLink ],
  templateUrl: './password-settings.component.html',
  styleUrl: './password-settings.component.css',
  providers: [MessageService]
})
export class PasswordSettingsComponent implements OnInit {
  constructor(private fb:FormBuilder, private accountService:AccountsService, private messageService:MessageService) {
  }

  passwordForm!: FormGroup
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    }, {validators: passwordMatchValidator});
  }

  updatePassword() {
    let password = {
      password: this.passwordForm.value.password
    }
    this.accountService.updateAccountPassword(password).subscribe({
      next: () => {
        this.messageService.add({severity:'success', detail: 'Password updated successfully'});
        this.passwordForm.reset()
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error});
      }
    })
  }
}
