import { TestBed } from '@angular/core/testing';

import { DialogoConfirmacionService } from './dialogo-confirmacion.service';

describe('DialogoConfirmacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogoConfirmacionService = TestBed.get(DialogoConfirmacionService);
    expect(service).toBeTruthy();
  });
});
