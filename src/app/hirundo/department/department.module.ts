import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRouting } from './department.routes';
import { DepartmentComponent } from './department.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DepartmentRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DepartmentComponent]
  
})
export class DepartmentModule { }
