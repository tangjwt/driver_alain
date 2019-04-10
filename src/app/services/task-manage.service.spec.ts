import { TestBed, inject } from '@angular/core/testing';

import { TaskManageService } from './task-manage.service';

describe('TaskManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskManageService]
    });
  });

  it('should be created', inject([TaskManageService], (service: TaskManageService) => {
    expect(service).toBeTruthy();
  }));
});
