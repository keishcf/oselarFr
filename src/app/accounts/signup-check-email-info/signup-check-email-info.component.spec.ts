import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCheckEmailInfoComponent } from './signup-check-email-info.component';

describe('SignupCheckEmailInfoComponent', () => {
  let component: SignupCheckEmailInfoComponent;
  let fixture: ComponentFixture<SignupCheckEmailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupCheckEmailInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupCheckEmailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
