import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationWrapperComponent } from './examination-wrapper.component';

describe('ExaminationWrapperComponent', () => {
  let component: ExaminationWrapperComponent;
  let fixture: ComponentFixture<ExaminationWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExaminationWrapperComponent]
    });
    fixture = TestBed.createComponent(ExaminationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
