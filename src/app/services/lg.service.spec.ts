import { TestBed, inject } from '@angular/core/testing';

import { LgService } from './lg.service';
import {FirebaseService} from './firebase.service';

describe('LgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LgService, FirebaseService]
    });
  });

  it('should be created', inject([LgService], (service: LgService) => {
    expect(service).toBeTruthy();
  }));
});
