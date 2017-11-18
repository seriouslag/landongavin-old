import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatMenuModule, MatOptionModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
  MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTabsModule, MatTooltipModule
} from '@angular/material';

import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatIconModule, MatInputModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatTooltipModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatIconModule, MatInputModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatTooltipModule
  ]
})

export class MyMaterialModule {}


