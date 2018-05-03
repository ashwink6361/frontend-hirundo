import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebsocketService } from '../../../service/websocket.service';
import { OrderService} from '../order/order.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private roomData = [];
  private tables = [];
  private activeRoom: boolean[] = [false];
  constructor(public router: Router,private orderService: OrderService, private dashboardService: DashboardService, public websocketService: WebsocketService) { }

  ngOnInit() {
    localStorage.removeItem('orderData');
    this.websocketService.getRooms().then(data => {
      this.roomData = data;
      this.activeRoom[0] = true;
      this.tables = this.roomData[0].tables;
      localStorage.setItem('roomdata', JSON.stringify(this.roomData[0]));
    })
      .catch(error => {
        console.log('error', error);
      });
  }

  createOrder(table) {
    localStorage.setItem('tabledata', JSON.stringify(table));
    let room = JSON.parse(localStorage.getItem('roomdata'));
    // console.log('table',table);
    // if(table.orderId && table.orderId._id){
    //   localStorage.setItem('orderId', JSON.stringify(table.orderId._id));
    //   localStorage.setItem('orderItems',JSON.stringify(table.orderId.item));
    //   let cp = 0;
    //   let itemno = 0;
    //   let varicost = 0;
    //   for (let i = 0; i < table.orderId.item.length; i++) {
    //     itemno += table.orderId.item[i].quantity;
    //     if (table.orderId.item[i].variant && table.orderId.item[i].variant.length) {
    //       for (let j = 0; j < table.orderId.item[i].variant.length; j++) {
    //         if (table.orderId.item[i].variant[j].status == 1) {
    //           varicost += table.orderId.item[i].variant[j].price;
    //         }
    //       }
    //     }
    //     cp += (table.orderId.item[i].price + varicost) * table.orderId.item[i].quantity;
    //   }
    //   let data = {
    //     roomId: table.orderId.room,
    //     tableId: table.orderId.table,
    //     noOfPeople: table.orderId.noOfPeople,
    //     selectedItems: [],
    //     cartTotalPrice : cp,
    //     cartTotalItem: itemno
    //   }
    //   this.orderService.setOrderData(data);
    // }
    // else{
    //   localStorage.removeItem('orderId');
    //   localStorage.removeItem('orderItems');
    // }
    // if(table.status == 1){
    //   this.router.navigate(['/waiter/order/:id/cart']);
    // }else{
      this.router.navigate(['/waiter/order', room._id]);
    // }
  }

  getTables(room, index) {
    localStorage.setItem('roomdata', JSON.stringify(room));
    this.tables = room.tables;
    this.activeRoom[index] = true;
    for (let i = 0; i < this.activeRoom.length; i++) {
      if (index != i) {
        this.activeRoom[i] = false;
      }
    }
  }
}
