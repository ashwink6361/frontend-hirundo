import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebsocketService } from '../../../service/websocket.service';
import { OrderService } from '../order/order.service';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private roomData = [];
  private tables = [];
  public stepArray = [];
  private activeRoom: boolean[] = [false];
  private loader: boolean = false;  
  constructor(public router: Router, private orderService: OrderService, private globalService: GlobalService, private dashboardService: DashboardService, public websocketService: WebsocketService) { }

  ngOnInit() {
    localStorage.removeItem('orderData');
    this.loader = true;
    this.websocketService.getRooms().then(data => {
      this.roomData = data;
      this.activeRoom[0] = true;
      this.tables = this.roomData[0].tables;
      localStorage.setItem('roomdata', JSON.stringify(this.roomData[0]));
      this.loader = false;      
    })
      .catch(error => {
      this.loader = false;              
      });
  }

  createOrder(table) {
    localStorage.setItem('tabledata', JSON.stringify(table));
    let room = JSON.parse(localStorage.getItem('roomdata'));
    if (table.orderId.length) {
      var steps = [];
      let selectedItems = {};
      steps = ['Uscita 1', 'Uscita 2'];
      for (let j = 0; j < steps.length; j++) {
        selectedItems[steps[j]] = [];
      }
      let data = {
        roomId: table.orderId[0].room,
        tableId: table.orderId[0].table,
        noOfPeople: table.orderId[0].noOfPeople,
        selectedItems: selectedItems,
        cartTotalPrice: 0,
        cartTotalItem: 0
      }
      this.orderService.setOrderData(data);
    }
    if (table.orderId.length) {
      this.orderService.showElement = false;
      if(this.orderService.getOrderData() && this.orderService.getOrderData().selectedItems){
        this.router.navigate(['/waiter/order/:id/cart']);
      }
    } else {
      this.orderService.showElement = true;
      this.router.navigate(['/waiter/order', room._id]);
    }
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
