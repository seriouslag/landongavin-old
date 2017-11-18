import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login.page.component';
import {MyMaterialModule} from '../../app.material.module';
import {LoginComponent} from '../../components/login/login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MyMaterialModule ],
      declarations: [ LoginPageComponent, LoginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
