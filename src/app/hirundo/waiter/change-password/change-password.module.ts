import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordRouting } from './change-password.routes';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule }  from '../../../shared/shared.module'
@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRouting,
    SharedModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
