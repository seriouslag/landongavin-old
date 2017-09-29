import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  user: firebase.User;

  private userSubscription: Subscription;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public logout(): void {
    this.firebaseService.logout();
  }

}
