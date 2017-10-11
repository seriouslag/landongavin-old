import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  @Input()
  src: string;

  @Input()
  editMode: boolean;

  constructor() { }

  ngOnInit() {
  }

}
