import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrderComponent } from './order.component';
import { ItemComponent } from './item/item.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { CartComponent } from './cart/cart.component';
export const routes: Routes = [
  
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: '', component: CreateOrderComponent },
      { path: 'choose-category',  component: ChooseCategoryComponent},
      { path: 'choose-item', component: ItemComponent },
      { path: 'cart', component: CartComponent },
    ],
    canActivate: []
  },
];

export const OrderRouting: ModuleWithProviders = RouterModule.forChild(routes);
