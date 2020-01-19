import { TestBed } from '@angular/core/testing';

import { PaynitApiService } from './paynit-api.service';

describe('PaynitApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaynitApiService = TestBed.get(PaynitApiService);
    expect(service).toBeTruthy();
  });
});
