import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';
import {LgService} from '../../services/lg.service';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseService} from '../../services/firebase.service';
import {MdSnackBar} from '@angular/material/snack-bar';
import {isUndefined} from 'util';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  aboutUser: User;

  aboutUserPic: string;
  noImg = true;

  editMode = false;
  showEditBtn = false;
  editBtnText = 'Edit';

  user: firebase.User;

  bio: string;
  company: string;
  job: string;

  private editSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private lgService: LgService, private firebaseService: FirebaseService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.editSubscription = this.lgService.editMode.subscribe(edit => {
      this.editMode = edit;
    });

    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
      if (user === null) {
        this.editMode = false;
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
          this.editMode = false;
          this.showEditBtn = false;
        } else {
          if (this.aboutUser) {
            if (this.user.uid === this.aboutUser.uid) {
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
  }

  public updateBio(bio: string) {
    if(this.editMode === true && !isUndefined(bio)) {
      this.bio = bio;
      if (bio === this.aboutUser.bio && this.job === this.aboutUser.job && this.company === this.aboutUser.company) {
        this.editBtnText = "Back";
      } else {
        this.editBtnText = "Save";
      }
    }
  }

  public updateJob(job: string) {
    if(this.editMode === true && !isUndefined(job)) {
      this.job = job;
      if (this.bio === this.aboutUser.bio && job === this.aboutUser.job && this.company === this.aboutUser.company) {
        this.editBtnText = "Back";
      } else {
        this.editBtnText = "Save";
      }
    }
  }

  public updateCompany(company: string) {
    console.log(company);
      if(this.editMode === true && !isUndefined(company)) {
        this.company = company;
        if (this.bio === this.aboutUser.bio && this.job === this.aboutUser.job && company === this.aboutUser.company) {
          this.editBtnText = "Back";
        } else {
          this.editBtnText = "Save";
        }
      }
  }

  private handleAboutUserChange(): void {
    this.noImg = true;
    this.handleProfilePic();
  }

  private handleProfilePic() {
    this.firebaseService.getUserProfileImg(this.aboutUser.uid).then((url: string) => {
      this.aboutUserPic = url;
      this.noImg = false;
    }, () => {
      this.noImg = true;
      console.log('FIREBASE STORAGE IMG NOT FOUND');
    });
  }

  public submit() {
    console.log('submit');
    this.editSaveBtn();
  }

  public editSaveBtn() {
    if (this.editMode === true) {
      // save info to firebase
      let updateObject = {};
      let update = false;
      if(this.aboutUser.bio !== this.bio && !isUndefined(this.bio)) {
        updateObject['bio'] = this.bio;
        update = true;
      }
      if(this.aboutUser.job !== this.job && !isUndefined(this.job)) {
        updateObject['job'] = this.job;
        update = true;
      }
      if(this.aboutUser.company !== this.company && !isUndefined(this.company)) {
        updateObject['company'] = this.company;
        update = true;
      }
      if(update === true) {
        console.log(update, updateObject);
        this.firebaseService.updateUserInfo(updateObject).then(() => {
          this.snackBar.open('Your profile has been updated.', 'OK', {duration: 1000});
        }).catch(() => {
          this.snackBar.open('Your profile failed to update.', 'OK', {duration: 1000});
        });

      }

    } else {
      // switch to edit mode
      this.job = this.aboutUser.job;
      this.company = this.aboutUser.company;
      this.bio = this.aboutUser.bio;
    }

    this.editMode = !this.editMode;
    if (this.editMode === false) {
      this.editBtnText = 'Edit';
    } else {
      this.editBtnText = 'Back';
    }

  }

}
