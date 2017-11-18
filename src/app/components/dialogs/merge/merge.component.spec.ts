import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeComponent } from './merge.component';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterModule} from '@angular/router';

describe('MergeComponent', () => {
  let component: MergeComponent;
  let fixture: ComponentFixture<MergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, RouterModule, CommonModule, MatDialogModule],
      providers: [MatDialogRef],

    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        declarations: [ MergeComponent ],
        entryComponents: [MergeComponent],
        exports: [MergeComponent],
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
