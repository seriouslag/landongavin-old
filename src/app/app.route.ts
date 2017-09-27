import {RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './pages/about/about.page.component';
import {HomePageComponent} from './pages/home/home.page.component';
import {Four04Component} from './pages/four04/four04.component';
import {SplashPageComponent} from './pages/splash/splash.page.component';

export const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'about', component: AboutPageComponent},
  {path: 'splash', component: SplashPageComponent},
  {path: '**', component: Four04Component}
];

export const routing = RouterModule.forRoot(appRoutes);


