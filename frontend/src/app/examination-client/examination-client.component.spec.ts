import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationClientComponent } from './examination-client.component';

describe('ExaminationClientComponent', () => {
  let component: ExaminationClientComponent;
  let fixture: ComponentFixture<ExaminationClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExaminationClientComponent]
    });
    fixture = TestBed.createComponent(ExaminationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
