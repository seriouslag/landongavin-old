import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageComponent } from './profile-image.component';
import {MyMaterialModule} from '../../../app.material.module';
import {CommonModule} from '@angular/common';

describe('ProfileImageComponent', () => {
  let component: ProfileImageComponent;
  let fixture: ComponentFixture<ProfileImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MyMaterialModule, CommonModule],
      declarations: [ ProfileImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
