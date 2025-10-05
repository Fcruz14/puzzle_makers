import { TestBed } from '@angular/core/testing';

import { MeteomaticsService } from './meteomatics';

describe('Meteomatics', () => {
  let service: MeteomaticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeteomaticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
