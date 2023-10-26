import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisDisplayComponent } from './diagnosis-display.component';

describe('DiagnosisDisplayComponent', () => {
  let component: DiagnosisDisplayComponent;
  let fixture: ComponentFixture<DiagnosisDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosisDisplayComponent]
    });
    fixture = TestBed.createComponent(DiagnosisDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
