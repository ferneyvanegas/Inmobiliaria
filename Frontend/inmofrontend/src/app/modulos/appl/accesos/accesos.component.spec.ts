import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesosComponent } from './accesos.component';

describe('AccesosComponent', () => {
  let component: AccesosComponent;
  let fixture: ComponentFixture<AccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
