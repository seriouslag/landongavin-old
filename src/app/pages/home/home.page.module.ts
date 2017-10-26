import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MyMaterialModule} from '../../app.material';
import {HomePageComponent} from './home.page.component';
import {BlogComponent} from '../../components/blog/blog.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: HomePageComponent }]), MyMaterialModule, CommonModule],
  declarations: [HomePageComponent, BlogComponent]
})

export class HomePageModule {}
