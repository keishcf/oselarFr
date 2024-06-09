import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordVerifyComponent } from './reset-password-verify.component';

describe('ResetPasswordVerifyComponent', () => {
  let component: ResetPasswordVerifyComponent;
  let fixture: ComponentFixture<ResetPasswordVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetPasswordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
