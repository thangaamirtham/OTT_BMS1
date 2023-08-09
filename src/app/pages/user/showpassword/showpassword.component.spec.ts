import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpasswordComponent } from './showpassword.component';

describe('ShowpasswordComponent', () => {
  let component: ShowpasswordComponent;
  let fixture: ComponentFixture<ShowpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
