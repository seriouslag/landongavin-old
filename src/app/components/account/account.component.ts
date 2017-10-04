import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  user: firebase.User;
  lgUser: User;

  private userSubscription: Subscription;
  private  lgUserSubscription: Subscription;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;

      if (this.user != null) {
        this.lgUserSubscription = this.firebaseService.getLGUserByUID(user.uid).subscribe(lgUser => {
          this.lgUser = lgUser;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  public logout(): void {
    this.firebaseService.logout();
  }
}
