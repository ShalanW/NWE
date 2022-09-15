import {TestBed} from '@angular/core/testing';

import {OnCallAccountService} from './on-call-account.service';

describe('MedicalService', () => {
  let service: OnCallAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnCallAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
