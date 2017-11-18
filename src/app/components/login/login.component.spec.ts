import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyMaterialModule} from '../../app.material.module';
import {LgService} from '../../services/lg.service';
import {CommonModule} from '@angular/common';
import {LoginFormModule} from '../forms/login-form/login-form.module';
import {FirebaseService} from '../../services/firebase.service';
import {DialogService} from '../../services/dialog.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, FormsModule, ReactiveFormsModule, CommonModule, LoginFormModule],
      declarations: [ LoginComponent ],
      providers: [LgService, FirebaseService, DialogService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
