import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

import {Card} from '../interfaces/card';
import {Observable} from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import {MdSnackBar} from '@angular/material';


@Injectable()
export class FirebaseService {

  public user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, private snackBar: MdSnackBar) {
    this.user = auth.authState;
    auth.auth.setPersistence('local');
  }

  public getBlogPostsFromFB(): FirebaseListObservable<Card[]> {
    return this.db.list('/blog');
  }

  public loginWithGoogleProvider(): void {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public loginWithEmailProvider(email: string, password: string): Promise<string> {
    return new Promise((resolve) => {
      this.auth.auth.signInWithEmailAndPassword(email, password).then(() => {
        resolve('ok');
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
        resolve(errorCode);
      });

    });
  }

  public logout(): void {
    this.auth.auth.signOut();
  }

  public createUserFromEmail(email: string, password: string, name?: string): Promise<string> {
    return new Promise((resolve) => {
      this.auth.auth.createUserWithEmailAndPassword(email, password).then((response) => {
      this.db.object('users/' + response.uid).set({email: email, name: name, created: Date.now()});
      resolve('ok');
    }).catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.snackBar.open(errorMessage, 'OK', {duration: 2000});
      if (errorCode === 'auth/weak-password') {
      } else if (errorCode === 'auth/invalid-email') {
      } else if (errorCode === 'auth/email-already-in-use') {
      } else if (errorCode === 'auth/operation-not-allowed') {
      } else {
        console.log('An unknown error occurred', error);
      }
      resolve(errorCode);
    });
  });
  }

}
