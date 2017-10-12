import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material/snack-bar';
import {FirebaseService} from '../../services/firebase.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../services/dialog.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  create = false;
  submitted = false;
  action = false;



  public closedLogin: Boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, this.validateEmail]),
    password: new FormControl(null, [Validators.required]),
  });

  matchingEmail: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, this.validateEmail]),
    cemail: new FormControl('', [Validators.required]),
  }, this.emailMatchValidator);

  matchingPassword: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(64), this.validatePW]),
    cpassword: new FormControl(null, [Validators.required]),
  }, this.passwordMatchValidator);

  accountForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    matchingEmail: this.matchingEmail,
    matchingPassword: this.matchingPassword,
  });

  constructor(public snackBar: MdSnackBar, private firebaseService: FirebaseService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }

  public loginOpened(): void {
    this.closedLogin = true;
  }

  public closeLogin(): void {
    this.closedLogin = false;
  }

  public loginWithEmail(): void {
    this.firebaseService.loginWithEmailProvider(this.loginForm.controls['email'].value.toLowerCase(),
      this.loginForm.controls['password'].value).then();
  }

  createUserLogin(): void {
    this.submitted = true;
    this.firebaseService.createUserFromEmail(
      this.matchingEmail.controls['email'].value.toLowerCase(), this.matchingPassword.controls['password'].value,
      this.accountForm.controls['firstname'].value, this.accountForm.controls['lastname'].value).then((user) => {
      if (user) {
        this.snackBar.open('Created account: ' + this.matchingEmail.controls['email'].value.toLowerCase());
        this.toLogin();
        this.action = true;
      } else {
        //Snackbar handled by service
        this.submitted = false;
      }
    });
  }

  public loginWithGoogle(): void {
    this.firebaseService.loginWithGoogleProvider();
  }

  public toCreateAccount() {
    this.create = true;
    this.title = 'Create Account';
  }

  public toLogin() {
    this.create = false;
    this.title = 'Login';
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

  private emailMatchValidator(fg: FormGroup) {
    const email = fg.get('email').value;
    const cemail = fg.get('cemail').value;

    if (email.toLowerCase() === cemail.toLowerCase()) {
      fg.get('cemail').setErrors(null);
      return null;
    } else {
      fg.get('cemail').setErrors({'mismatch': true});
      return {'mismatch': true};
    }
  }

  private validatePW(fc: FormControl) {
    // old
    // const PW_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&()])[A-Za-z\d$@!%*?&]{8,}/;

    // new but needs a ton of client side validation and an api backend to check against commonly used passwords
    // lots of work but security is the name of the game :D
    const PW_REGEXP = /^.{8,64}$/;


    return PW_REGEXP.test(fc.value) ? null : {
      'pw': true
    };
  }

  private validateEmail(fc: FormControl): any {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,12}))/i;

    return EMAIL_REGEXP.test(fc.value) ? null : {
      'email': true
    };
  }
}
