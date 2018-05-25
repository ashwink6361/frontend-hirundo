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
  constructor(public router: Router, private orderService: OrderService, private globalService: GlobalService, private dashboardService: DashboardService, public websocketService: WebsocketService) { }

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
    console.log('table', table);
    if (table.orderId != null && table.orderId._id) {
      localStorage.setItem('orderId', JSON.stringify(table.orderId._id));
      localStorage.setItem('orderItems', JSON.stringify(table.orderId.item));
      for (var i = 0; i < table.orderId.step.length; i++) {
        this.stepArray.push(table.orderId.step[i].step);
      }
      if (this.stepArray.length) {
        this.globalService.setStepData(this.stepArray);
      }
      var steps = [];
      let selectedItems = {};
      if (this.globalService.getStepData()) {
        steps = this.globalService.getStepData();
      }
      else {
        steps = ['Uscita 1', 'Uscita 2'];
      }
      for (let j = 0; j < steps.length; j++) {
        selectedItems[steps[j]] = [];
      }
      let data = {
        roomId: table.orderId.room,
        tableId: table.orderId.table,
        noOfPeople: table.orderId.noOfPeople,
        selectedItems: selectedItems,
        cartTotalPrice: 0,
        cartTotalItem: 0
      }
      this.orderService.setOrderData(data);
    }
    else {
      localStorage.removeItem('orderId');
      localStorage.removeItem('orderItems');
    }
    if (table.status == 1) {
      this.orderService.showElement = false;
      this.router.navigate(['/waiter/order/:id/cart']);
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
