import { TestBed } from '@angular/core/testing';

import { SharedStrenneManagementService } from './shared-strenne-management.service';

describe('SharedStrenneManagementService', () => {
  let service: SharedStrenneManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedStrenneManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
