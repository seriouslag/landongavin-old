import {NgModule} from '@angular/core';
import {LoginFormComponent} from './login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MyMaterialModule} from '../../../app.material.module';

@NgModule({
  imports: [MyMaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})

export class LoginFormModule {}
