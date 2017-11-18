import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {MyMaterialModule} from '../../app.material.module';
import {ProfileImageComponent} from '../editable/profile-image/profile-image.component';
import {TextInputComponent} from '../editable/text-input/text-input.component';
import {SocialLinkComponent} from '../editable/social-link/social-link.component';
import {CommonModule} from '@angular/common';
import {LgService} from '../../services/lg.service';
import {FirebaseService} from '../../services/firebase.service';
import {RouterModule} from '@angular/router';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule, RouterModule],
      declarations: [ AboutComponent, ProfileImageComponent, TextInputComponent, SocialLinkComponent],
      providers: [FirebaseService, LgService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
