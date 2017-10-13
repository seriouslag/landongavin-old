import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user";
import {FirebaseService} from "../../../services/firebase.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

  @Input()
  editMode: boolean;

  @Input()
  editUser: User;

  isVerified = false;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  public sendEmailVerification(): void {
    this.firebaseService.sendEmailVerification();
  }

}
