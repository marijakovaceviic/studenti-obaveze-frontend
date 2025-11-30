import { TestBed } from '@angular/core/testing';

import { PrijaveService } from './prijave.service';

describe('PrijaveService', () => {
  let service: PrijaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrijaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
