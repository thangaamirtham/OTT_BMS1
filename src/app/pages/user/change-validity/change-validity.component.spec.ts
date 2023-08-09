import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeValidityComponent } from './change-validity.component';

describe('ChangeValidityComponent', () => {
  let component: ChangeValidityComponent;
  let fixture: ComponentFixture<ChangeValidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeValidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
