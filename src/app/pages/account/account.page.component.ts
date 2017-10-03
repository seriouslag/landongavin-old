import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../interfaces/user';
import {Subscription} from 'rxjs/Subscription';
import {MdSnackBar} from '@angular/material/snack-bar';

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



  matchingPassword: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8), this.validatePW]),
    cpassword: new FormControl(null, [Validators.required]),
  }, this.passwordMatchValidator);

  settingsForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.minLength(2)]),
    lastname: new FormControl(null, [Validators.minLength(2)]),
    matchingPassword: this.matchingPassword,
  });

  constructor(private firebaseService: FirebaseService, private snackBar: MdSnackBar) {
    this.lgUser = {
      fname: 'First',
      lname: 'Last',
      email: '',
      bio: '',
      job: '',
      company: '',
      twitch: '',
      youtube: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      resumeLink: '',
      vanity: '',
      dateCreated: '',
      uid: ''
    };

  }

  ngOnInit() {
    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
      if (user != null) {
        this.lgUserSubscription = this.firebaseService.getLGUserByUID(user.uid).take(1).subscribe(lgUser => {
          this.lgUser = lgUser;
          this.settingsForm.controls['firstname'].patchValue(lgUser.fname);
          this.settingsForm.controls['lastname'].patchValue(lgUser.lname);
          if (this.lgUserSubscription) {
            this.lgUserSubscription.unsubscribe();
          }
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

  private passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password').value;
    const cpassword = fg.get('cpassword').value;

    if (password === cpassword) {
      fg.get('cpassword').setErrors(null);
      return null;
    } else {
      fg.get('cpassword').setErrors({'mismatch': true});
      return {'mismatch': true};
    }
  }

  private validatePW(fc: FormControl) {
    const PW_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&()])[A-Za-z\d$@!%*?&]{8,}/;

    return PW_REGEXP.test(fc.value) ? null : {
      'pw': true
    };
  }

  public resetPassword(): void {
    this.firebaseService.sendPasswordResetEmail(this.user.email, {}).then(() => {
      this.snackBar.open('Password reset email sent to ' + this.user.email + '.', 'OK', {duration: 5000});
    }).catch(() => {
      this.snackBar.open('Something went wrong, try again later.', 'OK', {duration: 5000});
    });
  }

  public saveUserInfo(): void {
    this.snackBar.open('This is not implemented yet :(', 'OK', {duration: 2000});
  }

}
