import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user';
import {FirebaseService} from '../../../services/firebase.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  @Input()
  editMode: boolean;

  @Input()
  editUser: User;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  public sendEmailVerification(): void {
    this.firebaseService.sendEmailVerification();
  }

}
