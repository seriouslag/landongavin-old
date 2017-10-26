import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MyMaterialModule} from '../../app.material';
import {CommonModule} from '@angular/common';
import {AboutPageComponent} from './about.page.component';
import {AboutComponent} from '../../components/about/about.component';
import {SocialLinkComponent} from '../../components/editable/social-link/social-link.component';
import {TextInputComponent} from '../../components/editable/text-input/text-input.component';
import {ProfileImageComponent} from '../../components/editable/profile-image/profile-image.component';
import {EmailVerificationComponent} from '../../components/editable/email-verification/email-verification.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: AboutPageComponent }]), MyMaterialModule, CommonModule, FormsModule],
  declarations: [AboutPageComponent, AboutComponent, SocialLinkComponent, TextInputComponent, ProfileImageComponent, EmailVerificationComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AboutPageModule {}
