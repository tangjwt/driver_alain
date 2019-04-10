import { TestBed, inject } from '@angular/core/testing';

import { ScriptManageService } from './script-manage.service';

describe('ScriptManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptManageService]
    });
  });

  it('should be created', inject([ScriptManageService], (service: ScriptManageService) => {
    expect(service).toBeTruthy();
  }));
});
