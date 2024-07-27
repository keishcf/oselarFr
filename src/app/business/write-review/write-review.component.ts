import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { map, Observable, Subscription, take, timer } from 'rxjs';
import { BusinessData } from '../business';
import { RatingModule } from 'primeng/rating';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BusinessService } from '../business.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-write-review',
  standalone: true,
  imports: [AvatarModule, CommonModule, RatingModule, FormsModule, ReactiveFormsModule, InputTextareaModule, InputTextModule, ButtonModule, ToastModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.css',
  providers: [MessageService]
})
export class WriteReviewComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private fb:FormBuilder, private businessServices:BusinessService, private router:Router, private messageService: MessageService) {}
  businessId!: string
  business: Observable<BusinessData> = this.route.data.pipe(map((data: any) => data['profile']))
  business$!: Subscription

  ngOnInit(): void {
    this.business$ = this.business.subscribe({
      next: res => {
        this.businessId = res.profile.id
      }
    })
  }

  ngOnDestroy(): void {
    this.business$.unsubscribe()
  }


  ReviewForm = this.fb.group({
    rating: [0, [Validators.min(1), Validators.required]],
    title: ['', [Validators.maxLength(100), Validators.minLength(5), Validators.required]],
    review: ['', [Validators.maxLength(1500), Validators.minLength(100), Validators.required]]
  })

  get rating() {
    return this.ReviewForm.get('rating')
  }

  get title() {
    return this.ReviewForm.get('title')
  }
  get review() {
    return this.ReviewForm.get('review')
  }

  markFormGroupTouched(formGroup: FormGroup) {
    // Mark all fields as touched to trigger validation
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  show() {

  }

  SubmitReview() {
    if (this.ReviewForm.valid) {
      this.businessServices.addBusinessReview(this.businessId, this.ReviewForm.value).subscribe({
        next: value => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Business review successfuly added' });
          this.ReviewForm.reset()
          timer(3000).pipe(take(1)).subscribe( {next: res => {
            this.router.navigate(['../'], {relativeTo : this.route})
          }} )
        },
      })
    } else {
      // Mark all fields as touched to display validation messages
      this.markFormGroupTouched(this.ReviewForm);
    }
  }
}
