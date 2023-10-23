import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientResultSubmitComponent } from './client-result-submit.component';

describe('ClientResultSubmitComponent', () => {
  let component: ClientResultSubmitComponent;
  let fixture: ComponentFixture<ClientResultSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientResultSubmitComponent]
    });
    fixture = TestBed.createComponent(ClientResultSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
