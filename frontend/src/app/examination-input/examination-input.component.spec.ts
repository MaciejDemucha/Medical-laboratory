import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationInputComponent } from './examination-input.component';

describe('ExaminationInputComponent', () => {
  let component: ExaminationInputComponent;
  let fixture: ComponentFixture<ExaminationInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExaminationInputComponent]
    });
    fixture = TestBed.createComponent(ExaminationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
