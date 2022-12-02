import { TestBed } from '@angular/core/testing';

import { AccesosService } from './accesos.service';

describe('AccesosService', () => {
  let service: AccesosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
