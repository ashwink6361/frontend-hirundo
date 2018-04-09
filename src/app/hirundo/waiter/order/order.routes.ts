import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
import { ItemComponent } from './item/item.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { CreateOrderComponent } from './create-order/create-order.component';
export const routes: Routes = [
  
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: '', component: CreateOrderComponent },
      { path: 'choose-category',  component: ChooseCategoryComponent},
      { path: 'choose-item', component: ItemComponent },
    ],
    canActivate: []
  },
];

export const OrderRouting: ModuleWithProviders = RouterModule.forChild(routes);
