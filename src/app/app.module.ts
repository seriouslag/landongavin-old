import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.page.component';
import {
  MdAutocompleteModule, MdButtonModule,
  MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdExpansionModule, MdIconModule,
  MdInputModule,
  MdLineModule,
  MdListModule, MdMenuModule,
  MdOptionModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule, MdRippleModule, MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule,
  MdSnackBarModule, MdSortModule, MdStepperModule, MdTabsModule, MdToolbarModule, MdTooltipModule, MdPaginatorModule,
  MdDatepickerModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutPageComponent } from './pages/about/about.page.component';
import { Four04Component } from './pages/four04/four04.component';

import {routing} from './app.route';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    Four04Component,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    routing,
    MdButtonModule, MdMenuModule, MdToolbarModule, MdInputModule, MdSidenavModule, MdIconModule, MdTabsModule,
    MdChipsModule, MdTooltipModule, MdCardModule, MdCheckboxModule, MdDialogModule,
    MdOptionModule, MdLineModule, MdListModule, MdProgressBarModule, MdProgressSpinnerModule, MdAutocompleteModule,
    MdButtonToggleModule, MdRadioModule, MdRippleModule, MdSelectModule, MdSliderModule,
    MdSlideToggleModule, MdSnackBarModule, MdExpansionModule, MdStepperModule, MdPaginatorModule, MdTabsModule, MdSortModule,
    MdDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
