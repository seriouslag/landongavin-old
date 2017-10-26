import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SplashPageComponent} from './splash.page.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: SplashPageComponent }]), MatCardModule],
  declarations: [SplashPageComponent]
})

export class SplashPageModule {}
