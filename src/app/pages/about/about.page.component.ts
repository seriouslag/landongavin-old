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
  aboutUser: User;
  aboutUID: string;

  private routerSubscription: Subscription;
  private vanitySubscription: Subscription;
  private lgUserSubscription: Subscription;

  constructor(private firebaseService: FirebaseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.routerSubscription = this.activatedRoute.params
      .subscribe(
        params => {
          this.vanitySubscription = this.firebaseService.getUIDByVanity(params['vanity'].toLowerCase()).subscribe(aboutUID => {
            this.waiting = false;
            this.aboutUID = aboutUID.val();
            if (this.aboutUID != null) {
              this.failed = false;
              this.getUserByUID(this.aboutUID);
            } else {
              this.failed = true;
              this.aboutUser = null;
            }
          });
        }
      );
  }

  ngOnDestroy(): void {
    if (this.vanitySubscription) {
      this.vanitySubscription.unsubscribe();
    }
    if (this.lgUserSubscription) {
      this.lgUserSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private getUserByUID(uid: string) {
    this.lgUserSubscription = this.firebaseService.getLGUserByUID(uid).subscribe(aboutUser => {
      this.aboutUser = aboutUser as User;
      if (aboutUser === null) {
        this.failed = true;
        this.waiting = false;
      }
    });
  }
}
