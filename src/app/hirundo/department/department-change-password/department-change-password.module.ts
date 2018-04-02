import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentChangePasswordComponent } from './department-change-password.component';
import { DepartmentChangePasswordRouting } from './department-change-password.routes';
import { SharedModule }  from '../../../shared/shared.module'
@NgModule({
  imports: [
    CommonModule,
    DepartmentChangePasswordRouting,
    SharedModule
  ],
  declarations: [DepartmentChangePasswordComponent]
})
export class DepartmentChangePasswordModule { }
