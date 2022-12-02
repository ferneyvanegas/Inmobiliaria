import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLoginComponent } from './nav-bar-login.component';

describe('NavBarLoginComponent', () => {
  let component: NavBarLoginComponent;
  let fixture: ComponentFixture<NavBarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
