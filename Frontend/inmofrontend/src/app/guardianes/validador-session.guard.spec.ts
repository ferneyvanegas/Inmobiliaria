import { TestBed } from '@angular/core/testing';

import { ValidadorSessionGuard } from './validador-session.guard';

describe('ValidadorSessionGuard', () => {
  let guard: ValidadorSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidadorSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
