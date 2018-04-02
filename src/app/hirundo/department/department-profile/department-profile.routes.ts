import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentProfileComponent } from './department-profile.component';

const routes: Routes = [
    { path: '', component: DepartmentProfileComponent }
];


export const DepartmentProfileRouting: ModuleWithProviders = RouterModule.forChild(routes); 
