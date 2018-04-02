import { TestBed, inject } from '@angular/core/testing';

import { UserChangePasswordService } from './user-change-password.service';

describe('UserChangePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserChangePasswordService]
    });
  });

  it('should be created', inject([UserChangePasswordService], (service: UserChangePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
