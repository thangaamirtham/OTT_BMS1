import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdepositComponent } from './listdeposit.component';

describe('ListdepositComponent', () => {
  let component: ListdepositComponent;
  let fixture: ComponentFixture<ListdepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
