import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageComponent } from './account.page.component';
import {MyMaterialModule} from '../../app.material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MyMaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
      declarations: [ AccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
