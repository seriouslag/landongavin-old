import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputComponent } from './text-input.component';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule, FormsModule],
      declarations: [ TextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
