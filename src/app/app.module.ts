import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.page.component';
import {
  MatAutocompleteModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatIconModule,
  MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule,
  MatDatepickerModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutPageComponent } from './pages/about/about.page.component';
import { Four04Component } from './pages/four04/four04.component';

import {routing} from './app.route';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { SplashPageComponent } from './pages/splash/splash.page.component';
import {AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FirebaseService} from './services/firebase.service';
import { BlogComponent } from './components/blog/blog.component';

import { Angulartics2Module, Angulartics2GoogleTagManager } from 'angulartics2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { MergeComponent } from './components/dialogs/merge/merge.component';
import {DialogService} from './services/dialog.service';
import {AccountPageComponent} from './pages/account/account.page.component';
import { AboutComponent } from './components/about/about.component';
import {LgService} from './services/lg.service';
import { QuestionDialogComponent } from './components/dialogs/question-dialog/question-dialog.component';
import { TextInputComponent } from './components/editable/text-input/text-input.component';
import { SocialLinkComponent } from './components/editable/social-link/social-link.component';
import { ProfileImageComponent } from './components/editable/profile-image/profile-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    AccountPageComponent,
    Four04Component,
    MenuComponent,
    LoginComponent,
    SplashPageComponent,
    BlogComponent,
    AccountComponent,
    MergeComponent,
    AboutComponent,
    QuestionDialogComponent,
    TextInputComponent,
    SocialLinkComponent,
    ProfileImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ]),
    MatAutocompleteModule, MatButtonModule,
    MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatIconModule,
    MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule,
    MatDatepickerModule,
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [FirebaseService, DialogService, LgService],
  entryComponents: [MergeComponent, QuestionDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
