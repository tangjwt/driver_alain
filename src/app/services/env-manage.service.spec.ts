import { TestBed, inject } from '@angular/core/testing';

import { EnvManageService } from './env-manage.service';

describe('EnvManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvManageService]
    });
  });

  it('should be created', inject([EnvManageService], (service: EnvManageService) => {
    expect(service).toBeTruthy();
  }));
});
