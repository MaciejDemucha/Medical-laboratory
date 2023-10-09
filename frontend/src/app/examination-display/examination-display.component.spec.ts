import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDisplayComponent } from './examination-display.component';

describe('ExaminationDisplayComponent', () => {
  let component: ExaminationDisplayComponent;
  let fixture: ComponentFixture<ExaminationDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExaminationDisplayComponent]
    });
    fixture = TestBed.createComponent(ExaminationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
