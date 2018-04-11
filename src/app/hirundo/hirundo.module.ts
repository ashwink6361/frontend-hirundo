import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MainRouting } from './hirundo.routes'
import { HirundoComponent } from './hirundo.component';
import { LoginService } from './login/login.service';
import { GlobalService } from './global.service';
import { WebsocketService } from '../service/websocket.service';
@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    MainRouting   ,
    MDBBootstrapModule
  ],
  declarations: [HirundoComponent],
  providers: [
    LoginService,
    GlobalService,
    WebsocketService
  ],
})
export class HirundoModule { }
