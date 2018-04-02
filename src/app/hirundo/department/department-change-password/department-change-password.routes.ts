import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentChangePasswordComponent } from './department-change-password.component';

const routes: Routes = [
    { path: '', component: DepartmentChangePasswordComponent }
];


export const DepartmentChangePasswordRouting: ModuleWithProviders = RouterModule.forChild(routes); 
