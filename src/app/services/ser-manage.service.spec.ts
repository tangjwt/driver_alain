import { TestBed, inject } from '@angular/core/testing';

import { SerManageService } from './ser-manage.service';

describe('SerManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerManageService]
    });
  });

  it('should be created', inject([SerManageService], (service: SerManageService) => {
    expect(service).toBeTruthy();
  }));
});
