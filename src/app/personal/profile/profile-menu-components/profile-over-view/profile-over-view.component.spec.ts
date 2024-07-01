import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverViewComponent } from './profile-over-view.component';

describe('ProfileOverViewComponent', () => {
  let component: ProfileOverViewComponent;
  let fixture: ComponentFixture<ProfileOverViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOverViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileOverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
