import { TestBed } from '@angular/core/testing';

import { DemonstratoriService } from './demonstratori.service';

describe('DemonstratoriService', () => {
  let service: DemonstratoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonstratoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
