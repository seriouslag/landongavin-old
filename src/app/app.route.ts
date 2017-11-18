import {RouterModule, Routes} from '@angular/router';
import {Four04Component} from './pages/four04/four04.component';


export const appRoutes: Routes = [
  {path: 'home', loadChildren: 'app/pages/home/home.page.module#HomePageModule'},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'about', redirectTo: 'about/LandonGavin', pathMatch: 'full'},
  {path: 'splash', loadChildren: 'app/pages/splash/splash.page.module#SplashPageModule'},
  {path: 'about/:vanity', loadChildren: 'app/pages/about/about.page.module#AboutPageModule'},
  {path: 'account', loadChildren: 'app/pages/account/account.page.module#AccountPageModule'},
  {path: 'login', loadChildren: 'app/pages/login/login.page.module#LoginPageModule'},

  /*
    Lazy loading with a wildcard does not work with angular4 yet.
    {path: '**', loadChildren: 'app/pages/splash/splash.page.module#SplashPageModule'}
   */
  {path: '**', component: Four04Component},
];

export const routing = RouterModule.forRoot(appRoutes);
