import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DepartmentComponent } from './department.component';
export const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    children: [
      { path: '', loadChildren: './order-list/order-list.module#OrderListModule' },     
      { path: 'change-password', loadChildren: './department-change-password/department-change-password.module#DepartmentChangePasswordModule' },  
      { path: 'profile', loadChildren: './department-profile/department-profile.module#DepartmentProfileModule' },          
    ],   
    canActivate: []
  },
];

export const DepartmentRouting: ModuleWithProviders = RouterModule.forChild(routes);
