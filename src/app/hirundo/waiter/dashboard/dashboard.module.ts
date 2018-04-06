import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouting } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
