import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserDialogComponent } from './newuser-dialog.component';

describe('NewuserDialogComponent', () => {
  let component: NewuserDialogComponent;
  let fixture: ComponentFixture<NewuserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserDialogComponent ]
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
