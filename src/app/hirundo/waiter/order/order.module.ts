import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { OrderComponent } from './order.component';
import { OrderRouting } from './order.routes';
import { OrderService } from './order.service';
import { ItemComponent } from './item/item.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { SharedModule } from '../../../shared/shared.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRouting,
    FormsModule,
    SharedModule.forRoot(),
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  declarations: [OrderComponent, ItemComponent, CreateOrderComponent, ChooseCategoryComponent, CartComponent],
  providers: [OrderService, ]
})
export class OrderModule { }
