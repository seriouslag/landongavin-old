import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';
import { FirebaseService } from './firebase.service';

@Injectable()
export class LgService {

  editModeSubscription: Subscription;

  editModeIntervalSubscription:  Subscription;

  public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firebaseService: FirebaseService) {
    this.editModeSubscription = this.editMode.subscribe(editMode => {
      if (editMode === true && firebaseService.isVerified() !== true) {
        this.editModeIntervalSubscription = Observable.interval(3000).subscribe(() => {
          this.firebaseService.refreshUser();
        });
      } else {
        console.log('not refreshing user');
        if (this.editModeIntervalSubscription) {
          this.editModeIntervalSubscription.unsubscribe();
        }
      }
    });
  }

}
