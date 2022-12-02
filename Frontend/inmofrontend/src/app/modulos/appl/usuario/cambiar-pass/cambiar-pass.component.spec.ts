import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPassComponent } from './cambiar-pass.component';

describe('CambiarPassComponent', () => {
  let component: CambiarPassComponent;
  let fixture: ComponentFixture<CambiarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
