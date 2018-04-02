import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentChangePasswordComponent } from './department-change-password.component';

describe('DepartmentChangePasswordComponent', () => {
  let component: DepartmentChangePasswordComponent;
  let fixture: ComponentFixture<DepartmentChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
