import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDialogComponent } from './question-dialog.component';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('QuestionDialogComponent', () => {
  let component: QuestionDialogComponent;
  let fixture: ComponentFixture<QuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule],
      declarations: [ QuestionDialogComponent ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [QuestionDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
