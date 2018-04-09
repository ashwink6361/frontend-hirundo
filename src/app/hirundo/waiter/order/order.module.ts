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
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    OrderRouting,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  declarations: [OrderComponent, ItemComponent, CreateOrderComponent, ChooseCategoryComponent, FilterPipe],
  providers: [OrderService, ]
})
export class OrderModule { }
