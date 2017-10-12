import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  customText: string;
  showButtonText: boolean;

  constructor(private questionDialog: MatDialogRef<QuestionDialogComponent>) { }

  ngOnInit() {
  }

  confirm(): void {
    this.questionDialog.close(1);
  }

  cancel(): void {
    this.questionDialog.close(0);
  }

}
