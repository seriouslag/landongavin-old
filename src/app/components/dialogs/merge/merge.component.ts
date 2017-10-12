import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FirebaseService} from '../../../services/firebase.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  email: string;
  firebaseService: FirebaseService;
  message: string;

  constructor(public mergeDialog: MatDialogRef<MergeComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.firebaseService.fetchProvidersForEmail(this.email.toLowerCase())
      .then(providers => {
        this.message = 'Account is already in use with: ';
        let count = 0;
        for (const provider of providers) {
          this.message += provider;
          if (count > 0 && count !== providers.length) {
            this.message += ', ';
          }
          count++;
        }
        this.message += '.';
        this.snackBar.open(this.message, 'OK', {duration: 3000});
      });
  }

  public confirm(): void {
    this.mergeDialog.close(1);
  }

  public cancel(): void {
    this.mergeDialog.close(0);
  }

}
