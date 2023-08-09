import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewuserComponent } from './renewuser.component';

describe('RenewuserComponent', () => {
  let component: RenewuserComponent;
  let fixture: ComponentFixture<RenewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
