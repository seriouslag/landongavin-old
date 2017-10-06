import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  customText: string;
  showButtonText: boolean;

  constructor(private questionDialog: MdDialogRef<QuestionDialogComponent>) { }

  ngOnInit() {
  }

  confirm(): void {
    this.questionDialog.close(1);
  }

  cancel(): void {
    this.questionDialog.close(0);
  }

}
