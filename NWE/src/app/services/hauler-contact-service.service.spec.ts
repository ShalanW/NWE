import { TestBed } from '@angular/core/testing';

import { HaulerContactServiceService } from './hauler-contact-service.service';

describe('HaulerContactServiceService', () => {
  let service: HaulerContactServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaulerContactServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
