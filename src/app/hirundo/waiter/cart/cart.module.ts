import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRouting } from './cart.routes'
@NgModule({
  imports: [
    CommonModule,
    CartRouting
  ],
  declarations: [CartComponent]
})
export class CartModule { }
