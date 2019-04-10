import { TestBed, inject } from '@angular/core/testing';

import { TagManageService } from './tag-manage.service';

describe('TagManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagManageService]
    });
  });

  it('should be created', inject([TagManageService], (service: TagManageService) => {
    expect(service).toBeTruthy();
  }));
});
