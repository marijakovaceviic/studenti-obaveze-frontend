import { TestBed } from '@angular/core/testing';

import { PredajeService } from './predaje.service';

describe('PredajeService', () => {
  let service: PredajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
