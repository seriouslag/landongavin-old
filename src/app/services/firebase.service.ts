import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {Card} from '../interfaces/card';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  public getBlogPostsFromFB(): FirebaseListObservable<Card[]> {

    return this.db.list('/blog');
  }
}
