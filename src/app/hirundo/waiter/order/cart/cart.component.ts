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
  private orderItems = [];
  private orderId;
  
  constructor(private orderService: OrderService, private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
    console.log('this.orderService.getOrderData()',this.orderService.getOrderData());
    console.log('globalService.getTabData().step',this.globalService.getTabData());
    if(localStorage.getItem('orderId')){
      this.orderId = JSON.parse(localStorage.getItem('orderId'));
      this.orderItems = JSON.parse(localStorage.getItem('orderItems'));
      console.log('this.orderItems.orderItems()',this.orderItems);
      console.log('this.orderId.orderId()',this.orderId);
      
    }
    if (this.orderService.getOrderData() && this.orderService.getOrderData().selectedItems) {
      this.items = this.orderService.getOrderData().selectedItems;
    }
  }

  createOrder() {
    let data = this.orderService.getOrderData();
    var itemarray = [];
    for (let i = 0; i < data.selectedItems.length; i++) {
      var vararray = [];
      if (data.selectedItems[i].variant) {
        for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
          var catarray = [];
          for (let k = 0; k < data.selectedItems[i].variant[j].category.length; k++) {
            catarray.push(data.selectedItems[i].variant[j].category[k]._id);
          }
          var vari = {
            name: data.selectedItems[i].variant[j].name,
            category: catarray,
            price: data.selectedItems[i].variant[j].price,
            status: data.selectedItems[i].variant[j].status
          }
          vararray.push(vari);
        }
      }
      var item = {
        id: data.selectedItems[i]._id,
        category: data.selectedItems[i].category._id,
        quantity: data.selectedItems[i].quantity,
        price: data.selectedItems[i].price,
        notes: data.selectedItems[i].ordernote ? data.selectedItems[i].ordernote : '',
        variant: vararray,
        step: data.selectedItems[i].step,
        department: data.selectedItems[i].category.department
      }
      itemarray.push(item);
    }
    let createorder = {
      room: data.roomId,
      table: data.tableId,
      noOfPeople: data.noOfPeople,
      item: itemarray
    }
    this.orderService.createOrder(createorder)
      .then(data => {
        this.router.navigate(['/waiter/list'])
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  deleteItemFromCart(article) {
    let data = this.orderService.getOrderData();
    for (let i = 0; i < data.selectedItems.length; i++) {
      if (data.selectedItems[i]._id == article._id && !article.variant) {
        //non variant type data
        for (let m = 0; m < data.categoryItems.length; m++) {
          if (data.categoryItems[m]._id == data.selectedItems[i]._id) {
            data.categoryItems[m].itemTotal = data.categoryItems[m].itemTotal - data.selectedItems[i].quantity;
          }
        }
        if (!data.selectedItems[i].variant) {
          data.selectedItems.splice(i, 1);
        }
      }
      else if (data.selectedItems[i]._id == article._id && article.variant) {
        //variant type data
        for (let m = 0; m < data.categoryItems.length; m++) {
          if (data.categoryItems[m]._id == data.selectedItems[i]._id) {
            data.categoryItems[m].itemTotal = data.categoryItems[m].itemTotal - data.selectedItems[i].quantity;
          }
        }
        if (data.selectedItems[i].variant) {
          data.selectedItems.splice(i, 1);
        }
      }
      let cp = 0;
      let itemno = 0;
      let varicost = 0;
      if (data.selectedItems.length) {
        for (let i = 0; i < data.selectedItems.length; i++) {
          itemno += data.selectedItems[i].quantity;
          if (data.selectedItems[i].variant) {
            for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
              if (data.selectedItems[i].variant[j].status == 1) {
                varicost += data.selectedItems[i].variant[j].price;
              }
            }
          }
          cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
          data.cartTotalPrice = cp;
          data.cartTotalItem = itemno;
        }
      }
      else {
        data.cartTotalPrice = 0;
        data.cartTotalItem = 0;
      }
      this.orderService.setOrderData(data);
      this.items = this.orderService.getOrderData().selectedItems;
    }
  }

  gotToCategoryList(){
    this.router.navigate(['/waiter/order/:id/choose-category']);
  }
}
