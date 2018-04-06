import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaiterRouting } from './waiter.routes'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { WaiterComponent } from './waiter.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileService } from '../waiter/profile/profile.service';
import { DashboardService } from './dashboard/dashboard.service';
@NgModule({
  imports: [
    CommonModule,
    WaiterRouting,
    SharedModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [WaiterComponent],
  providers: [
    ProfileService,
    DashboardService
  ]
})
export class WaiterModule { }
