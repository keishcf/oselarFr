import { resolve } from 'node:path';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { error } from 'node:console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  constructor(private route:ActivatedRoute, private accountservices:AccountsService, private router:Router) {}

  verifyMessage!: string
  activationCode: any
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.activationCode = params['code']
        console.log(this.activationCode)
      }
    })

    if (this.activationCode != undefined) {
      this.accountservices.VerifyEmail(this.activationCode).subscribe({
        next: (result) => {
          this.verifyMessage = "Success"
        },
        error: (error) => {
          console.log(error)
          if (error.status === 0) {
            this.verifyMessage = "Nerror"
            // this.verifyMessage = {
            //   type: "Nerror",
            //   message: "Looks like Your are not connected to internet please try again later, If you're still experiencing issues, reach out to our support team for assistance. We're here to help you get onboarded smoothly!"
            // }
          } else if (error.status === 400) {
            this.verifyMessage = "Vfailed"
            // this.verifyMessage = {
            //   type: "vFailed",
            //   message: "Uh-oh! It seems we couldn't verify your email address. Don't worry, let's try that again. Please double-check the email you provided and ensure it's correct. If you're still experiencing issues, reach out to our support team for assistance. We're here to help you get onboarded smoothly!"
            // }
          } else {
            this.verifyMessage = "Uknown"
            // this.verifyMessage = {
            //   type: "unKnown",
            //   message: "Uh-Nooo! It seems we there is an issue on our side. Don't worry, Try that again in a few minutes. If you're still experiencing issues, reach out to our support team for assistance. We're here to help you get onboarded smoothly!"
            // }
          }
        }
      })
    } else {
      this.router.navigate(['/login'])
    }
  }
}
