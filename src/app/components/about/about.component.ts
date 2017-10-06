import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';
import {LgService} from '../../services/lg.service';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseService} from '../../services/firebase.service';
import {MdSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  aboutUser: User;

  aboutUserPic: string;
  noImg = true;

  editMode = false;
  showEditBtn = false;

  user: firebase.User;

  private editSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private lgService: LgService, private firebaseService: FirebaseService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.editSubscription = this.lgService.editMode.subscribe(edit => {
      this.editMode = edit;
    });

    this.userSubscription = this.firebaseService.user.subscribe(user => {
      this.user = user;
      if (user === null) {
        this.editMode = false;
        this.showEditBtn = false;
      } else {
        if (this.aboutUser) {
          if (user.uid === this.aboutUser.uid) {
            this.showEditBtn = true;
          }
        }
      }
    });

    this.handleProfilePic();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'aboutUser') {
        this.noImg = true;
        
        this.handleProfilePic();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  private handleProfilePic() {
    this.firebaseService.getUserProfileImg(this.aboutUser.uid).then((url: string) => {
      this.aboutUserPic = url;
      this.noImg = false;
    }, () => {
      this.noImg = true;
      console.log('FIREBASE STORAGE IMG NOT FOUND');
    });
  }

  public enterEditMode() {
    this.snackBar.open('Edit mode is not implemented yet :(', 'OK', {duration: 2000});
  }

}