import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmanagerComponent } from './editmanager.component';

describe('EditmanagerComponent', () => {
  let component: EditmanagerComponent;
  let fixture: ComponentFixture<EditmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
