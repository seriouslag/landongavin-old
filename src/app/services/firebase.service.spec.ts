import { TestBed, inject } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import {DialogService} from './dialog.service';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule, FirebaseApp} from 'angularfire2';
import {environment} from '../../environments/environment';

describe('FirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuthModule, AngularFireDatabaseModule, AngularFireModule.initializeApp(environment.firebase)],
      providers: [FirebaseService, DialogService, FirebaseApp, AngularFireAuth, AngularFireDatabase],
    });
  });

  it('should be created', inject([FirebaseService], (service: FirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
