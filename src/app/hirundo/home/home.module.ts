import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routes';
@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
