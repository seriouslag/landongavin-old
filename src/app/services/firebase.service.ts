import { Injectable, Inject } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

import {Card} from '../interfaces/card';
import {Observable} from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import {MdSnackBar, MdDialogRef} from '@angular/material';
import {User} from '../interfaces/user';
import {FirebaseApp} from 'angularfire2';
import {DialogService} from './dialog.service';
import {MergeComponent} from '../components/dialogs/merge/merge.component';


@Injectable()
export class FirebaseService {

  public user: Observable<firebase.User>;
  public storage: any;
  public storageRef: any;

  mergeDialog: MdDialogRef<MergeComponent>;

  constructor(@Inject(FirebaseApp) firebaseApp: any, private db: AngularFireDatabase,
              private auth: AngularFireAuth, private snackBar: MdSnackBar, private dialogService: DialogService) {
    this.user = auth.authState;
    auth.auth.setPersistence('local');
    this.storage = firebaseApp.storage();
    this.storageRef = this.storage.ref();
  }

  public getBlogPostsFromFB(): FirebaseListObservable<Card[]> {
    return this.db.list('/blog');
  }

  public loginWithGoogleProvider(): void {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user: firebase.User) => {
      this.db.object('/users/' + user.uid).take(1).subscribe(lgUser => {
        if (lgUser == null) {
          const tempUser: User = <User>{};
          tempUser.dateCreated = Date.now().toString();
          if (user.email) {
            tempUser.email = user.email;
          }
          if (user.uid) {
              tempUser.uid = user.uid;
              tempUser.vanity = user.uid.toLowerCase();
              this.setUserVanity(user.uid.toLowerCase());
          }
          if (user.displayName) {
            if (user.displayName.indexOf(' ') >= 0) {
              tempUser.fname = user.displayName.substr(0, user.displayName.indexOf(' '));
              if (user.displayName.indexOf(' ') < user.displayName.length) {
                tempUser.lname = user.displayName.substr(user.displayName.indexOf(' '));
              }
            }
          }
        }
      });
    });
  }

  public loginWithEmailProvider(email: string, password: string): firebase.Promise<User> {
    return this.auth.auth.signInWithEmailAndPassword(email, password).then(() => {
      }).catch((error: any) => {
        const errorCode = error.code;
        this.snackBar.open(error.message, 'OK', {
          duration: 2000,
        });
        if (errorCode === 'auth/user-disabled') {
        } else if (errorCode === 'auth/invalid-email') {
        } else if (errorCode === 'auth/user-not-found') {
        } else if (errorCode === 'auth/wrong-password') {
        } else {
          console.log('An unknown error occurred', error);
        }
      });
  }

  public logout(): void {
    this.auth.auth.signOut().then(() => {
      this.snackBar.open('Successfully signed out.', 'OK', {duration: 1750});
    }, () => {
      this.snackBar.open('Something went wrong :(', 'OK', {duration: 1750});
    });
  }

  public saveUserToDB(lgUser: User): firebase.Promise<void> {
    return this.db.object('users/' + lgUser.uid).set(lgUser);
  }

  public createUserFromEmail(email: string, password: string, fname: string, lname: string): firebase.Promise<User> {
    return this.auth.auth.createUserWithEmailAndPassword(email, password).then((response) => {

        this.saveUserToDB(<User>{
          email: email, fname: fname, lname: lname,
          bio: '', job: '', company: '', twitter: '',
          facebook: '', instagram: '', twitch: '', youtube: '',
          google: '', uid: response.uid, linkedin: '', resumeLink: '',
          vanity: response.uid.toLowerCase(),
          dateCreated: Date.now().toString(),
        });

        this.setUserVanity(response.uid.toLowerCase());

      }).catch((error: firebase.FirebaseError) => {
      if (error.code === 'auth/weak-password') {
        this.snackBar.open('Password is too weak', 'OK', {duration: 2000});
      } else if (error.code === 'auth/invalid-email') {
        this.snackBar.open('Email is invalid', 'OK', {duration: 2000});
      } else if (error.code === 'auth/email-already-in-use') {

        this.mergeDialog = this.dialogService.openDialog(MergeComponent, {});
        this.mergeDialog.componentInstance.email = email;
        this.mergeDialog.componentInstance.firebaseService = this;
        this.mergeDialog.afterClosed().subscribe(result => {
          if (result === 1) {
            // confirm
          } else {
            // cancel
          }
          this.snackBar.open('Merging accounts is not supported yet :(', 'OK', {duration: 2200});
        });

      } else if (error.code === 'auth/operation-not-allowed') {
        this.snackBar.open('This is not allowed at this time', 'OK', {duration: 2000});
      } else {
        this.snackBar.open('Cannot process, unknown error', 'OK', {duration: 2000});
      }
    });
  }

  public fetchProvidersForEmail(email: string): firebase.Promise<string[]> {
    return this.auth.auth.fetchProvidersForEmail(email);
  }

  public sendPasswordResetEmail(email: string, actionCodeSettings: any): firebase.Promise<void> {
    return this.auth.auth.sendPasswordResetEmail(email, actionCodeSettings);
  }

  public getUIDByVanity(vanity: string): FirebaseObjectObservable<any> {
    return this.db.object('/vanities/' + vanity, { preserveSnapshot: true });
  }

  public getLGUserByUID(uid: string): FirebaseObjectObservable<User> {
    return this.db.object('/users/' + uid);
  }

  public getUserProfileImg(uid: string): firebase.Promise<string> {
    return this.storageRef.child('users/' + uid + '/profile.jpg').getDownloadURL();
  }

  // Use until backend is setup
  public getAllVanities(): FirebaseListObservable<any> {
    return this.db.list('/vanities');
  }

  public setUserVanity(vanity: string): firebase.Promise<any> {
    vanity = vanity.toLowerCase();
    let uid = this.auth.auth.currentUser.uid;
    let lgUser: User;
    let oldVanity: string;
    return new Promise(resolve => {
      const req = this.getLGUserByUID(uid);
      req.take(1).subscribe(u => {
        lgUser = u;
        oldVanity = lgUser.vanity;
        this.db.object('/vanities').update({[lgUser.vanity]:null});
        this.db.object('users/' + uid).update({vanity: vanity});
        return resolve(this.db.object('/vanities').update({[vanity]:lgUser.uid}));
      });
    });
  }

  public updateUserInfo(updateObject: any): firebase.Promise<any> {
    return this.db.object('/users/' + this.auth.auth.currentUser.uid).update(updateObject);
  }
}
