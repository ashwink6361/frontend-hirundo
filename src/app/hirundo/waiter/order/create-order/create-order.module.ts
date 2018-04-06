import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderRouting } from './create-order.routes';
import { Ng2CompleterModule } from 'ng2-completer';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    CreateOrderRouting,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  declarations: [CreateOrderComponent, FilterPipe]
})
export class CreateOrderModule { }
