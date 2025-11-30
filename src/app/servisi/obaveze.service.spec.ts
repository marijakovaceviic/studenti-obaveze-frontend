import { TestBed } from '@angular/core/testing';

import { ObavezeService } from './obaveze.service';

describe('ObavezeService', () => {
  let service: ObavezeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObavezeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
