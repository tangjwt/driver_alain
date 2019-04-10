import { TestBed, inject } from '@angular/core/testing';

import { ProjectManageService } from './project-manage.service';

describe('ProjectManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectManageService]
    });
  });

  it('should be created', inject([ProjectManageService], (service: ProjectManageService) => {
    expect(service).toBeTruthy();
  }));
});
