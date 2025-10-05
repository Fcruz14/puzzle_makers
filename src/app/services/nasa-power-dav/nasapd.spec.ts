import { TestBed } from '@angular/core/testing';

import { Nasapd } from './nasapd';

describe('Nasapd', () => {
  let service: Nasapd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nasapd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
