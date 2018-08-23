import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirundoComponent } from './hirundo.component';

describe('ProjectComponent', () => {
  let component: HirundoComponent;
  let fixture: ComponentFixture<HirundoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirundoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirundoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
