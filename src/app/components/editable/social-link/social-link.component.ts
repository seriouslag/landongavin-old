import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.css'],
  animations: [
    trigger('openclose', [
      transition(':enter', [
        style({
          top: 0,
        }),
        animate('.75s ease-in-out', style({
          top: '-50%',
        }))
      ]),
      transition(':leave', [
        style({
          top: '-50%',
        }),
        animate('1s ease-in-out', style({
          top: 0,
        }))
      ])
    ]),
  ]
})
export class SocialLinkComponent implements OnInit, OnChanges {

  @Input()
  editMode = false;

  @Input()
  type: string;

  @Input()
  link: string;

  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;

  href = '';
  styleClass = '';
  editPanelOpen = false;

  constructor() { }

  ngOnInit() {
    this.setHREF(this.type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'type') {
        this.setHREF(propName);
      } else if (propName === 'link') {
        this.setHREF(this.type);
      }
    }
  }

  private setHREF(type: string) {
    this.href = '';
    this.styleClass = '';
    switch (type) {
      case 'instagram': {
        this.href = 'www.instagram.com/';
        this.styleClass = 'mdi-instagram';
        break;
      }
      case 'facebook': {
        this.href = 'www.facebook.com/';
        this.styleClass = 'mdi-facebook-box';
        break;
      }
      case 'youtube': {
        this.href = 'www.youtube.com/';
        this.styleClass = 'mdi-youtube-play';
        break;
      }
      case 'twitter': {
        this.href = 'www.twitter.com/';
        this.styleClass = 'mdi-twitter-box';
        break;
      }
      case 'twitch': {
        this.href = 'www.twitch.tv/';
        this.styleClass = 'mdi-twitch';
        break;
      }
      case 'linkedin': {
        this.href = 'www.linkedin.com/in/';
        this.styleClass = 'mdi-linkedin-box';
        break;
      }
    }
    if (this.href && this.link) {
      this.href = this.href + this.link;
    } else {
      // invalid type :(
    }
  }

  private closeMenu(): void {
    this.menu.closeMenu();
  }

  public onEnter() {
    this.notify.emit(this.link.trim());
    this.closeMenu();
  }

  public onInput(event: string): void {
    this.link = event;
  }

  public toggleEditPanel() {
    this.editPanelOpen = !this.editPanelOpen;
  }
}
