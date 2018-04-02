import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProfileRouting } from './profile.routes'
@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
