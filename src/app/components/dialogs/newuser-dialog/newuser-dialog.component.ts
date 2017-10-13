import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {FirebaseService} from "../../../services/firebase.service";

@Component({
  selector: 'app-newuser-dialog',
  templateUrl: './newuser-dialog.component.html',
  styleUrls: ['./newuser-dialog.component.css']
})
export class NewuserDialogComponent implements OnInit {

  firebaseService: FirebaseService;

  occupationForm: FormGroup = new FormGroup({
    occupation: new FormControl(null, [Validators.required])
  });
  companyForm: FormGroup = new FormGroup({
    company: new FormControl(null, [Validators.required])
  });
  bioForm: FormGroup = new FormGroup({
    bio: new FormControl(null, [Validators.required])
  });

  constructor(private newuserDialog:  MatDialogRef<NewuserDialogComponent>) { }

  ngOnInit() {
  }

  public sendEmailVerification() {
    this.firebaseService.sendEmailVerification();
  }

  public saveInfo(): void {
    this.newuserDialog.close(1);
  }

  public cancel(): void {
    this.newuserDialog.close(0);
  }

}
