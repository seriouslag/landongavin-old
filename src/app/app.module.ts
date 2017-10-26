import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {routing} from './app.route';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import {AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FirebaseService} from './services/firebase.service';

import { Angulartics2Module, Angulartics2GoogleTagManager } from 'angulartics2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { MergeComponent } from './components/dialogs/merge/merge.component';
import {DialogService} from './services/dialog.service';
import {LgService} from './services/lg.service';
import { QuestionDialogComponent } from './components/dialogs/question-dialog/question-dialog.component';
import {NewuserDialogComponent} from './components/dialogs/newuser-dialog/newuser-dialog.component';
import { MyMaterialModule } from './app.material';
import {Four04Component} from './pages/four04/four04.component';

@NgModule({
  declarations: [
    Four04Component,
    AppComponent,
    MenuComponent,
    LoginComponent,
    AccountComponent,
    MergeComponent,
    QuestionDialogComponent,
    NewuserDialogComponent,
  ],
  imports: [
    MyMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ]),

  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [FirebaseService, DialogService, LgService],
  entryComponents: [MergeComponent, QuestionDialogComponent, NewuserDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
