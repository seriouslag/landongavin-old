import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about.page.component';
import {MyMaterialModule} from '../../app.material.module';
import {FormsModule} from '@angular/forms';
import {AboutComponent} from '../../components/about/about.component';
import {SocialLinkComponent} from '../../components/editable/social-link/social-link.component';
import {TextInputComponent} from '../../components/editable/text-input/text-input.component';
import {ProfileImageComponent} from '../../components/editable/profile-image/profile-image.component';
import {EmailVerificationComponent} from '../../components/editable/email-verification/email-verification.component';
import {CommonModule} from '@angular/common';

describe('About.PageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MyMaterialModule, FormsModule, CommonModule],
      declarations: [AboutPageComponent, AboutComponent, SocialLinkComponent, TextInputComponent, ProfileImageComponent, EmailVerificationComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
