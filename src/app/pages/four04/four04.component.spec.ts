import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Four04Component } from './four04.component';
import {MyMaterialModule} from '../../app.material.module';

describe('Four04Component', () => {
  let component: Four04Component;
  let fixture: ComponentFixture<Four04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MyMaterialModule ],
      declarations: [ Four04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Four04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
