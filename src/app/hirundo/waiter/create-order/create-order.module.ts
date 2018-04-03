import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderRouting } from './create-order.routes';
import { Ng2CompleterModule } from 'ng2-completer';
@NgModule({
  imports: [
    CommonModule,
    CreateOrderRouting,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  declarations: [CreateOrderComponent]
})
export class CreateOrderModule { }
