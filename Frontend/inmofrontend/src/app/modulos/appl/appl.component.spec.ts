import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplComponent } from './appl.component';

describe('AppComponent', () => {
  let component: ApplComponent;
  let fixture: ComponentFixture<ApplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
