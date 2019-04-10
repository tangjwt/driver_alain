import { TestBed, inject } from '@angular/core/testing';

import { EnvUrlManageService } from './env-url-manage.service';

describe('EnvUrlManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvUrlManageService]
    });
  });

  it('should be created', inject([EnvUrlManageService], (service: EnvUrlManageService) => {
    expect(service).toBeTruthy();
  }));
});
