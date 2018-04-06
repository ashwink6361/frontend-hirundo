import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
export const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: '', loadChildren: './create-order/create-order.module#CreateOrderModule' },  
      { path: 'choose-category', loadChildren: './choose-category/choose-category.module#ChooseCategoryModule' },      
      
    ],   
    canActivate: []
  },
];

export const OrderRouting: ModuleWithProviders = RouterModule.forChild(routes);
