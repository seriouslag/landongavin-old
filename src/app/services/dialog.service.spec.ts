import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import {MatDialogModule} from '@angular/material';

describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [DialogService]
    });
  });

  it('should be created', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));
});
