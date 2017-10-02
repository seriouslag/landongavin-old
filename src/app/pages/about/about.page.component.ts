import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interfaces/user';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-about.page',
  templateUrl: './about.page.component.html',
  styleUrls: ['./about.page.component.css']
})
export class AboutPageComponent implements OnInit, OnDestroy {

  waiting = true;
  failed = false;
  noImg = true;
  user: firebase.User;
  aboutUser: User;
  aboutUID: string;
  aboutUserPic: string;
  private userSubscription: Subscription;
  private vanitySubscription: Subscription;

  constructor(private firebaseService: FirebaseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
    });
    this.vanitySubscription = this.activatedRoute.params
      .subscribe(
        params => {
          this.firebaseService.getUIDByVanity(params['vanity'].toLowerCase()).subscribe(aboutUID => {
            this.waiting = false;
            this.aboutUID = aboutUID.val();
            if (this.aboutUID != null) {
              this.failed = false;
              this.firebaseService.getUserProfileImg(this.aboutUID).then((url: string) => {
                this.aboutUserPic = url;
                this.noImg = false;
              }, () => {
                this.noImg = true;
                console.log('FIREBASE STORAGE IMG NOT FOUND');
              });
              this.getUserByUID(this.aboutUID);
            } else {
              this.failed = true;
            }
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.vanitySubscription.unsubscribe();
  }

  private getUserByUID(uid: string) {
    this.firebaseService.getUserByUID(uid).subscribe(aboutUser => {
      this.aboutUser = aboutUser as User;
    });
  }
}
