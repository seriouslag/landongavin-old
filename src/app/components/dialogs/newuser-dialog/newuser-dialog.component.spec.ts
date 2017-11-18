import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserDialogComponent } from './newuser-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('NewuserDialogComponent', () => {
  let component: NewuserDialogComponent;
  let fixture: ComponentFixture<NewuserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, FormsModule, CommonModule, MatDialogModule, ReactiveFormsModule],
      declarations: [ NewuserDialogComponent ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [NewuserDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
