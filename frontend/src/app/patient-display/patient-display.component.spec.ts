import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDisplayComponent } from './patient-display.component';

describe('PatientDisplayComponent', () => {
  let component: PatientDisplayComponent;
  let fixture: ComponentFixture<PatientDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDisplayComponent]
    });
    fixture = TestBed.createComponent(PatientDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
