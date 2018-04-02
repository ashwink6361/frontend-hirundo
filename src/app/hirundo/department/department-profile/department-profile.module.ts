import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentProfileComponent } from './department-profile.component';
import { DepartmentProfileRouting } from './department-profile.routes';
import { DepartmentProfileService } from './department-profile.service'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
@NgModule({
  imports: [
    CommonModule,
    DepartmentProfileRouting,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule
  ],
  declarations: [DepartmentProfileComponent],
  providers: [
    DepartmentProfileService
  ]
})
export class DepartmentProfileModule { }
