import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnstatusComponent } from './trnstatus.component';

describe('TrnstatusComponent', () => {
  let component: TrnstatusComponent;
  let fixture: ComponentFixture<TrnstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
