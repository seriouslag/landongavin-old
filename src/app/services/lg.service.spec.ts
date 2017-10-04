import { TestBed, inject } from '@angular/core/testing';

import { LgService } from './lg.service';

describe('LgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LgService]
    });
  });

  it('should be created', inject([LgService], (service: LgService) => {
    expect(service).toBeTruthy();
  }));
});
