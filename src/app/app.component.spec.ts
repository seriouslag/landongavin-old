import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AccountComponent} from './components/account/account.component';
import {MenuComponent} from './components/menu/menu.component';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FirebaseService} from './services/firebase.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        AppComponent, LoginComponent, AccountComponent, MenuComponent, RouterOutlet
      ],
      providers: [FirebaseService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
