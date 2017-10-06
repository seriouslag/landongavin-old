import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input()
  editMode: boolean;

  @Input()
  text: string;

  @Input()
  placeholder: string;

  @Input()
  type: string;

  @Input()
  maxlength: number;

  constructor() { }

  ngOnInit() {
  }

}
