import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseCategoryComponent } from './choose-category.component';
import { ChooseCategoryRouting } from './choose-category.routes'

@NgModule({
  imports: [
    CommonModule,
    ChooseCategoryRouting
  ],
  declarations: [ChooseCategoryComponent]
})
export class ChooseCategoryModule { }
