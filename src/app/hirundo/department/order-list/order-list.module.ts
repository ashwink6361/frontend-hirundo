import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { OrderListRouting } from './order-list.routes';
import { OrderListService } from './order-list.service';
import { WebsocketService } from '../../../service/websocket.service';
import { OrderByPipe } from '../../orderby';
@NgModule({
  imports: [
    CommonModule,
    OrderListRouting
  ],
  declarations: [OrderListComponent, OrderByPipe],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    WebsocketService,
    OrderListService
  ],
})
export class OrderListModule { }
