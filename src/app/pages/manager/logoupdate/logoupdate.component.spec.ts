import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoupdateComponent } from './logoupdate.component';

describe('LogoupdateComponent', () => {
  let component: LogoupdateComponent;
  let fixture: ComponentFixture<LogoupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
