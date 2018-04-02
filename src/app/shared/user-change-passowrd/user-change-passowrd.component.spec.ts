import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePassowrdComponent } from './user-change-passowrd.component';

describe('UserChangePassowrdComponent', () => {
  let component: UserChangePassowrdComponent;
  let fixture: ComponentFixture<UserChangePassowrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePassowrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
