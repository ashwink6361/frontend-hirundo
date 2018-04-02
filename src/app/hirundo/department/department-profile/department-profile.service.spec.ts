import { TestBed, inject } from '@angular/core/testing';

import { DepartmentProfileService } from './department-profile.service';

describe('DepartmentProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentProfileService]
    });
  });

  it('should be created', inject([DepartmentProfileService], (service: DepartmentProfileService) => {
    expect(service).toBeTruthy();
  }));
});
