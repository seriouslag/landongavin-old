import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../interfaces/user';
import {Subscription} from 'rxjs/Subscription';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogService} from '../../services/dialog.service';
import {MatDialogRef} from '@angular/material';
import {QuestionDialogComponent} from '../../components/dialogs/question-dialog/question-dialog.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account-app',
  templateUrl: './account.page.component.html',
  styleUrls: ['./account.page.component.css']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private lgUserSubscription: Subscription;

  user: firebase.User;
  lgUser: User;

  confirmDialog: MatDialogRef<QuestionDialogComponent>;

  settingsForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.minLength(2)]),
    lastname: new FormControl(null, [Validators.minLength(2)]),
    vanity: new FormControl(null, [Validators.minLength(3), Validators.maxLength(30), this.validateVanity],  [ this.vanityMatchValidator.bind(this)])
  });

  constructor(private firebaseService: FirebaseService, private dialogService: DialogService, private snackBar: MatSnackBar) {
    this.lgUser = {
      fname: 'First', lname: 'Last', email: '',
      bio: '', job: '', company: '',
      twitch: '', youtube: '', facebook: '',
      twitter: '', linkedin: '', instagram: '',
      resumeLink: '', vanity: 'Vanity', dateCreated: '',
      uid: '', image: '', isVerified: false
    };
  }

  ngOnInit() {
    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
      if (user != null) {
        this.lgUserSubscription = this.firebaseService.getLGUserByUID(user.uid).subscribe(lgUser => {
          this.lgUser = lgUser;
          this.settingsForm.controls['firstname'].patchValue(lgUser.fname);
          this.settingsForm.controls['lastname'].patchValue(lgUser.lname);
          this.settingsForm.controls['vanity'].patchValue(lgUser.vanity);
        });
      } else {
        this.lgUser = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.lgUserSubscription) {
      this.lgUserSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private validateVanity(fc: FormControl) {
    const VANITY_REGEXP = /^[a-zA-Z][a-zA-Z0-9]{2,29}$/;

    return VANITY_REGEXP.test(fc.value) ? null : {
      'vanity': true
    };
  }

  private vanityMatchValidator(control: AbstractControl): Promise<any> {
    const vanityCheck = control.value;

    const check = false;
    // should do check  on backend to see if request vanity is available but this works for now
    return new Promise(resolve => {
      const req = this.firebaseService.getAllVanities().snapshotChanges();
      req.take(1).subscribe(vanities => {
        for (const vanity of vanities) {
          if (vanity['key'] === vanityCheck && vanityCheck !== this.lgUser.vanity) {
            return resolve({vanityInUse: true});
          }
        }

        if (check === false) {
          return resolve(null);
        }
      });
    });
  }

  public resetPassword(): void {
    this.confirmDialog = this.dialogService.openDialog(QuestionDialogComponent, {});
    this.confirmDialog.componentInstance.customText = 'Reset Password?';
    this.confirmDialog.componentInstance.showButtonText = true;

    this.confirmDialog.afterClosed().take(1).subscribe(result => {
      if (result === 1) {
        this.firebaseService.sendPasswordResetEmail(this.user.email, {}).then(() => {
          this.snackBar.open('Password reset email sent to ' + this.user.email + '.', 'OK', {duration: 5000});
        }).catch(() => {
          this.snackBar.open('Something went wrong, try again later.', 'OK', {duration: 5000});
        });
      } else {
        // Did nothing
      }
    });

  }

  public saveUserInfo(): void {
    const update = {};
    if (this.lgUser.fname !== this.settingsForm.controls['firstname'].value) {
      update['fname'] = this.settingsForm.controls['firstname'].value;
    }
    if (this.lgUser.lname !== this.settingsForm.controls['lastname'].value) {
      update['lname'] = this.settingsForm.controls['lastname'].value;
    }
    if (this.lgUser.vanity !== this.settingsForm.controls['vanity'].value) {
      this.firebaseService.setUserVanity(this.settingsForm.controls['vanity'].value);
    }

    this.firebaseService.updateUserInfo(update);

    this.snackBar.open('You account information has been updated :D', 'OK', {duration: 3000});
  }
}
