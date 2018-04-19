import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRouting } from './list.routes'
@NgModule({
  imports: [
    CommonModule,
    ListRouting
  ],
  declarations: [ListComponent]
})
export class ListModule { }
