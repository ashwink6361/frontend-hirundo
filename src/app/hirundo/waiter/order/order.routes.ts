import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
export const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'create-order/:id', loadChildren: './create-order/create-order.module#DashboardModule' },    
      
    ],   
    canActivate: []
  },
];

export const WaiterRouting: ModuleWithProviders = RouterModule.forChild(routes);
