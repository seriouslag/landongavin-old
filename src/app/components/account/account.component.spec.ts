import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import {MyMaterialModule} from '../../app.material.module';
import {CommonModule} from '@angular/common';
import {FirebaseService} from '../../services/firebase.service';
import {RouterModule} from '@angular/router';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule, RouterModule],
      declarations: [ AccountComponent ],
      providers: [FirebaseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
