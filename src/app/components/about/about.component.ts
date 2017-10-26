import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';
import {LgService} from '../../services/lg.service';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseService} from '../../services/firebase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {isUndefined} from 'util';
import * as firebase from 'firebase';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  aboutUser: User;

  noImg = true;

  editMode = false;
  showEditBtn = false;
  editBtnText = 'Edit';

  user: firebase.User;

  userProperties = [
    'bio',
    'company',
    'job',
    'twitter',
    'twitch',
    'facebook',
    'instagram',
    'linkedin',
    'youtube'
  ];

  private editSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private lgService: LgService, private firebaseService: FirebaseService, private snackBar: MatSnackBar) {
    for (const property of this.userProperties) {
      this[property] = '';
    }
  }

  ngOnInit() {
    this.editSubscription = this.lgService.editMode.subscribe(edit => {
      this.editMode = edit;
      console.log('editMode in about', edit);
    });

    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
      if (user === null) {
        this.setEditMode(false);
        this.showEditBtn = false;
      } else {
        if (this.aboutUser) {
          if (user.uid === this.aboutUser.uid) {
            this.showEditBtn = true;
          }
        }
      }
    });

    this.handleProfilePic();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'aboutUser') {
        this.handleAboutUserChange();
        // check for user being undefined because you could land on this page before firebase does a check
        if (this.user === null || isUndefined(this.user)) {
          this.setEditMode(false);
          this.showEditBtn = false;
        } else {
          if (this.aboutUser) {
            if (this.user.uid === this.aboutUser.uid) {
              this.editBtnText = 'Edit';
              this.showEditBtn = true;
            }
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private setEditMode(editMode: boolean) {
    this.lgService.editMode.next(editMode);
  }

  private hasChanged(): boolean {
    let changed = false;

    for (const property of this.userProperties) {
      if (this[property] !== this.aboutUser[property]) {
        changed = true;
      }
    }

    return changed;
  }

  public updateUserProperties(property: string, event: string): void {
    if (this.editMode === true && !isUndefined(event)) {

      this[property] = event;
      if (this.hasChanged()) {
        this.editBtnText = 'Save';
      } else {
        this.editBtnText = 'Back';
      }
    }
  }

  private handleAboutUserChange(): void {
    this.noImg = true;
    if (this.aboutUser.image !== null || !isUndefined(this.aboutUser.image)) {
      this.handleProfilePic();
    }

  }

  private handleProfilePic() {
    this.firebaseService.getUserProfileImg(this.aboutUser.uid).then((url: string) => {
      this.aboutUser.image = url;
      this.noImg = false;
    }, () => {
      this.noImg = true;
      this.aboutUser.image = '';
      console.log('FIREBASE STORAGE IMG NOT FOUND');
    });
  }

  public submit() {
    this.editSaveBtn();
  }

  public editSaveBtn() {
    if (this.editMode === true) {
      // save info to firebase
      const updateObject = {};
      let update = false;

      for (const property of this.userProperties) {
        if (this.aboutUser[property] !== this[property] && !isUndefined(this[property])) {
          updateObject[property] = this[property];
          update = true;
        }
      }

      if (update === true) {
        console.log(update, updateObject);
        this.firebaseService.updateUserInfo(updateObject).then(() => {
          this.snackBar.open('Your profile has been updated.', 'OK', {duration: 1000});
        }).catch(() => {
          this.snackBar.open('Your profile failed to update.', 'OK', {duration: 1000});
        });

      }

    } else {
      // switch to edit mode

      for (const property of this.userProperties) {
        this[property] = this.aboutUser[property];
      }

    }

    this.setEditMode(!this.editMode);
    if (this.editMode === false) {
      this.editBtnText = 'Edit';
    } else {
      this.editBtnText = 'Back';
    }
  }

}
