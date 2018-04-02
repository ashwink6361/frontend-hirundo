import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderRouting } from './create-order.routes';
@NgModule({
  imports: [
    CommonModule,
    CreateOrderRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateOrderComponent]
})
export class CreateOrderModule { }
