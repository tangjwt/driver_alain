import { TestBed, inject } from '@angular/core/testing';

import { RunResultService } from './run-result.service';

describe('RunResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunResultService]
    });
  });

  it('should be created', inject([RunResultService], (service: RunResultService) => {
    expect(service).toBeTruthy();
  }));
});
