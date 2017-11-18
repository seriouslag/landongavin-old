import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationComponent } from './email-verification.component';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';
import {FirebaseService} from '../../../services/firebase.service';
import {User} from '../../../interfaces/user';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule],
      declarations: [ EmailVerificationComponent ],
      providers: [FirebaseService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    component.editMode = false;
    component.editUser = <User>{
      fname: 'Landon',
      lname: 'string',
      email: 'string',
      image: 'string',
      bio: 'string',
      job: 'string',
      company: 'string',
      facebook: 'string',
      twitch: 'string',
      twitter: 'string',
      instagram: 'string',
      linkedin: 'string',
      youtube: 'string',
      vanity: 'string',
      uid: 'string',
      resumeLink: 'string',
      dateCreated: 'string',
      isVerified: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
