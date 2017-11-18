import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './home.page.component';
import {BlogComponent} from '../../components/blog/blog.component';
import {MyMaterialModule} from '../../app.material.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: HomePageComponent }]), MyMaterialModule, CommonModule],
  declarations: [HomePageComponent, BlogComponent]
})

export class HomePageModule {}
