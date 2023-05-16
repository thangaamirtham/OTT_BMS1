import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStatusCheckComponent } from './pay-status-check.component';

describe('PayStatusCheckComponent', () => {
  let component: PayStatusCheckComponent;
  let fixture: ComponentFixture<PayStatusCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayStatusCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
