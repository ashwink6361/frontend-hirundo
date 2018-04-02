import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRouting } from './register.routes';
import { RegisterComponent } from './register.component';
@NgModule({
  imports: [
    CommonModule,
    RegisterRouting
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
