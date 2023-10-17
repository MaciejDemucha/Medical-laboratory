import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResultsComponent } from './display-results.component';

describe('DisplayResultsComponent', () => {
  let component: DisplayResultsComponent;
  let fixture: ComponentFixture<DisplayResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayResultsComponent]
    });
    fixture = TestBed.createComponent(DisplayResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
