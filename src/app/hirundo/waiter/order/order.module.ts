import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRouting } from './order.routes';
import { OrderService } from './order.service';
@NgModule({
  imports: [
    CommonModule,
    OrderRouting
  ],
  declarations: [OrderComponent],
  providers : [OrderService]
})
export class OrderModule { }
