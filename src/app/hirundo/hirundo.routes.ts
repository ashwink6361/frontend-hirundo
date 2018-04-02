import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HirundoComponent } from './hirundo.component';
export const routes: Routes = [
  { path: 'waiter', loadChildren: './waiter/waiter.module#WaiterModule' },
  { path: 'department', loadChildren: './department/department.module#DepartmentModule' }, 
  {
    path: '',
    component: HirundoComponent,
    children: [
      { path: '', loadChildren: './home/home.module#HomeModule' },  
      { path: 'login', loadChildren: './login/login.module#LoginModule' }, 
      { path: 'register', loadChildren: './register/register.module#RegisterModule' }, 
      { path: 'waiter', loadChildren: './waiter/waiter.module#WaiterModule' }, 
      
    ],   
    canActivate: []
  },
];

export const MainRouting: ModuleWithProviders = RouterModule.forChild(routes);
