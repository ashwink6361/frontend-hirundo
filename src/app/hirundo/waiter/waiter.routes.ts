import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WaiterComponent } from './waiter.component';
export const routes: Routes = [    
  {
    path: '',
    component: WaiterComponent,
    children: [
      { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },     
      { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule' },    
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },            
      { path: 'cart', loadChildren: './cart/cart.module#CartModule' },  
      { path: 'create-order/:id', loadChildren: './order/order.module#OrderModule' },   
    ],   
    canActivate: []
  },
];

export const WaiterRouting: ModuleWithProviders = RouterModule.forChild(routes);
