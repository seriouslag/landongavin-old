import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinkComponent } from './social-link.component';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

describe('SocialLinkComponent', () => {
  let component: SocialLinkComponent;
  let fixture: ComponentFixture<SocialLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule, FormsModule],
      declarations: [ SocialLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLinkComponent);
    component = fixture.componentInstance;
    component.editMode = false;
    component.link = 'landongavin';
    component.type = 'facebook';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
