import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowpackComponent } from './allowpack.component';

describe('AllowpackComponent', () => {
  let component: AllowpackComponent;
  let fixture: ComponentFixture<AllowpackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowpackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
