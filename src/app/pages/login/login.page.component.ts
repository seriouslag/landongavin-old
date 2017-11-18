import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private routerSubscription: Subscription;
  private redirectAfterLogin: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routerSubscription = this.activatedRoute.params.subscribe(params => {
      if (params['redirectAfterLogin']) {
        this.redirectAfterLogin = params['redirectAfterLogin'];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }



}
