import {RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './pages/about/about.page.component';
import {HomePageComponent} from './pages/home/home.page.component';
import {Four04Component} from './pages/four04/four04.component';
import {SplashPageComponent} from './pages/splash/splash.page.component';
import {AccountPageComponent} from './pages/account/account.page.component';

export const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'about', redirectTo: 'about/LandonGavin', pathMatch: 'full'},
  {path: 'splash', component: SplashPageComponent},
  {path: 'about/:vanity', component: AboutPageComponent},
  {path: 'account', component: AccountPageComponent},
  {path: '**', component: Four04Component}
];

export const routing = RouterModule.forRoot(appRoutes);
