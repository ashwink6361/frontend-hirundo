import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private items = [];
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.items = this.orderService.getOrderData().selectedItems;
  }

  createOrder() {
    let data = this.orderService.getOrderData();
    var itemarray = [];
    for (let i = 0; i < data.selectedItems.length; i++) {
      var item = {
        id: data.selectedItems[i]._id,
        category: data.selectedItems[i].category._id,
        quantity: data.selectedItems[i].quantity,
        price: data.selectedItems[i].price,
        notes: '',
        variant: []
      }
      itemarray.push(item);
    }
    let createorder = {
      room: data.roomId,
      table: data.tableId,
      noOfPeople: data.numberOfPerson,
      item: itemarray
    }
    console.log('createorder', createorder);
    this.orderService.createOrder(createorder)
      .then(data => {
        console.log('data', data);
        this.router.navigate(['/waiter'])
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  deleteItemFromCart(article){
    let data = this.orderService.getOrderData();
    for(let i=0;i<data.selectedItems.length;i++){
      if(data.selectedItems[i]._id == article._id){
        data.selectedItems.splice(i,1);
      }
    this.orderService.setOrderData(data);      
    this.items = this.orderService.getOrderData().selectedItems;
    }
  }
}
