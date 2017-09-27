import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public closedLogin: Boolean = false;

  constructor(public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  public openSnackBar() {
    this.snackBar.open('Not implemented yet :(', 'OK', {
      duration: 1500,
    });
  }

  public loginOpened() {
    this.closedLogin = true;
  }

  public closeLogin() {
    this.closedLogin = false;
  }
}
