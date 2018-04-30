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
  constructor(private orderService: OrderService, private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
    if (this.orderService.getOrderData().selectedItems) {
      this.items = this.orderService.getOrderData().selectedItems;
      console.log('this.items',this.items);
    }
    console.log(this.globalService.getTabData(), 'sdafs')
  }

  createOrder() {
    let data = this.orderService.getOrderData();
    var itemarray = [];
    for (let i = 0; i < data.selectedItems.length; i++) {
      var vararray = [];
      if(data.selectedItems[i].variant){
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
        step: data.selectedItems[i].step
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
        if (!data.selectedItems[i].variant) {
          data.selectedItems.splice(i, 1);
        }
      }
      else if (data.selectedItems[i]._id == article._id && article.variant) {
        //variant type data
        if (data.selectedItems[i].variant) {
          data.selectedItems.splice(i, 1);
        }
      }
      let cp = 0;
      let itemno = 0;    
      let varicost = 0;                                                                                                                                              
      if(data.selectedItems.length){
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
      else{
        data.cartTotalPrice = 0;
        data.cartTotalItem = 0;                                                        
      }
      this.orderService.setOrderData(data);
      this.items = this.orderService.getOrderData().selectedItems;
    }
  }
}
