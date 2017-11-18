import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MyMaterialModule} from '../../app.material.module';
import {LoginPageComponent} from './login.page.component';
import {LoginFormModule} from '../../components/forms/login-form/login-form.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: LoginPageComponent }]), MyMaterialModule, LoginFormModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginPageComponent],
})

export class LoginPageModule {}
