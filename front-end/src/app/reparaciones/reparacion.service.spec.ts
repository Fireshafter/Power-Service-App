import { TestBed } from '@angular/core/testing';

import { ReparacionService } from './reparacion.service';

describe('ReparacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReparacionService = TestBed.get(ReparacionService);
    expect(service).toBeTruthy();
  });
});
