import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {FirebaseService} from "./services/firebase.service";

import * as firebase from 'firebase';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  user: firebase.User;
  private routerSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        //send event to analytics?
      });
    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
