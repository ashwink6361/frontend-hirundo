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
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.items = this.orderService.getOrderData().selectedItems;
    console.log('data.this.items', this.items);
  }

}
