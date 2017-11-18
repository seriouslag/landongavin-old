import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MyMaterialModule} from '../../app.material.module';
import {CommonModule} from '@angular/common';
import {AccountPageComponent} from './account.page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: AccountPageComponent }]), MyMaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AccountPageComponent]
})

export class AccountPageModule {}
