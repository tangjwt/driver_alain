import { TestBed, inject } from '@angular/core/testing';

import { CaseFilepathService } from './case-filepath.service';

describe('CaseFilepathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseFilepathService]
    });
  });

  it('should be created', inject([CaseFilepathService], (service: CaseFilepathService) => {
    expect(service).toBeTruthy();
  }));
});
