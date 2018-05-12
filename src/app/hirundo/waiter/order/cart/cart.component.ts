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
    if(localStorage.getItem('orderId')){
      this.orderId = JSON.parse(localStorage.getItem('orderId'));
      this.orderItems = JSON.parse(localStorage.getItem('orderItems'));
    }
    // if (this.orderService.getOrderData() && this.orderService.getOrderData().selectedItems) {
    //   this.items = this.orderService.getOrderData().selectedItems;
    // }
  }

  createOrder() {
    let data = this.orderService.getOrderData();
    var itemarray = [];
    var steps = [];
      if (this.globalService.getStepData()) {
        steps = this.globalService.getStepData();
      }
      else {
        steps = ['Uscita 1', 'Uscita 2'];
      }     
       for(let a=0;a<steps.length;a++){

    for (let i = 0; i < data.selectedItems[steps[a]].length; i++) {
      var vararray = [];
      if (data.selectedItems[steps[a]][i].variant) {
        for (let j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
          var catarray = [];
          for (let k = 0; k < data.selectedItems[steps[a]][i].variant[j].category.length; k++) {
            catarray.push(data.selectedItems[steps[a]][i].variant[j].category[k]._id);
          }
          var vari = {
            name: data.selectedItems[steps[a]][i].variant[j].name,
            category: catarray,
            price: data.selectedItems[steps[a]][i].variant[j].price,
            status: data.selectedItems[steps[a]][i].variant[j].status
          }
          vararray.push(vari);
        }
      }
      var item = {
        id: data.selectedItems[steps[a]][i]._id,
        category: data.selectedItems[steps[a]][i].category._id,
        quantity: data.selectedItems[steps[a]][i].quantity,
        price: data.selectedItems[steps[a]][i].price,
        notes: data.selectedItems[steps[a]][i].ordernote ? data.selectedItems[steps[a]][i].ordernote : '',
        variant: vararray,
        step: data.selectedItems[steps[a]][i].step,
        department: data.selectedItems[steps[a]][i].category.department
      }
      itemarray.push(item);
    }
  }
    let createorder = {
      room: data.roomId,
      table: data.tableId,
      noOfPeople: data.noOfPeople,
      item: itemarray
    }
    if(this.orderId){
      this.orderService.updateOrder(itemarray,this.orderId)
      .then(data => {
        this.router.navigate(['/waiter/list'])
      })
      .catch(error => {
        console.log('error', error);
      });
    }
    else{
      this.orderService.createOrder(createorder)
      .then(data => {
        this.router.navigate(['/waiter/list'])
      })
      .catch(error => {
        console.log('error', error);
      });
    }
  }

  // deleteItemFromCart(article) {
  //   let data = this.orderService.getOrderData();
  //   for (let i = 0; i < data.selectedItems.length; i++) {
  //     if (data.selectedItems[i]._id == article._id && !article.variant) {
  //       //non variant type data
  //       for (let m = 0; m < data.categoryItems.length; m++) {
  //         if (data.categoryItems[m]._id == data.selectedItems[i]._id) {
  //           data.categoryItems[m].itemTotal = data.categoryItems[m].itemTotal - data.selectedItems[i].quantity;
  //         }
  //       }
  //       if (!data.selectedItems[i].variant) {
  //         data.selectedItems.splice(i, 1);
  //       }
  //     }
  //     else if (data.selectedItems[i]._id == article._id && article.variant) {
  //       //variant type data
  //       for (let m = 0; m < data.categoryItems.length; m++) {
  //         if (data.categoryItems[m]._id == data.selectedItems[i]._id) {
  //           data.categoryItems[m].itemTotal = data.categoryItems[m].itemTotal - data.selectedItems[i].quantity;
  //         }
  //       }
  //       if (data.selectedItems[i].variant) {
  //         data.selectedItems.splice(i, 1);
  //       }
  //     }
  //     let cp = 0;
  //     let itemno = 0;
  //     let varicost = 0;
  //     if (data.selectedItems.length) {
  //       for (let i = 0; i < data.selectedItems.length; i++) {
  //         itemno += data.selectedItems[i].quantity;
  //         if (data.selectedItems[i].variant) {
  //           for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
  //             if (data.selectedItems[i].variant[j].status == 1) {
  //               varicost += data.selectedItems[i].variant[j].price;
  //             }
  //           }
  //         }
  //         cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
  //         data.cartTotalPrice = cp;
  //         data.cartTotalItem = itemno;
  //       }
  //     }
  //     else {
  //       data.cartTotalPrice = 0;
  //       data.cartTotalItem = 0;
  //     }
  //     this.orderService.setOrderData(data);
  //     this.items = this.orderService.getOrderData().selectedItems;
  //   }
  // }

  deleteItemFromCart(article) {
    let data = this.orderService.getOrderData();
    let currentStep = this.globalService.getTabData().step;
    for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
      if (data.selectedItems[currentStep][i]._id == article._id && !article.variant) {
        //non variant type data
        for (let m = 0; m < data.categoryItems[currentStep].length; m++) {
          if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
            data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
          }
        }
        if (!data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
          data.selectedItems[currentStep].splice(i, 1);
        }
      }
      else if (data.selectedItems[currentStep][i]._id == article._id && article.variant) {
        //variant type data
        for (let m = 0; m < data.categoryItems[currentStep].length; m++) {
          if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
            data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
          }
        }
        if (data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
          data.selectedItems[currentStep].splice(i, 1);
        }
      }
    }
      let cp = 0;
      let itemno = 0;
      let varicost = 0;
      var steps = [];
      if (this.globalService.getStepData()) {
        steps = this.globalService.getStepData();
      }
      else {
        steps = ['Uscita 1', 'Uscita 2'];
      }
      let emptyArray = [];
      for(let a=0;a<steps.length;a++){
          if (data.selectedItems[steps[a]].length) {
            for (let i = 0; i < data.selectedItems[steps[a]].length; i++) {
              itemno += data.selectedItems[steps[a]][i].quantity;
              if (data.selectedItems[steps[a]][i].variant) {
                for (let j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                  if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                    varicost += data.selectedItems[steps[a]][i].variant[j].price;
                  }
                }
              }
              cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
              data.cartTotalPrice = cp;
              data.cartTotalItem = itemno;
            }
          }
          if (data.selectedItems[steps[a]].length == 0) {
            if(emptyArray.indexOf(steps[a])<0){
              emptyArray.push(steps[a]);
            }
          }
          if(emptyArray.length == steps.length){
            data.cartTotalPrice = 0;
            data.cartTotalItem = 0;
          }
      }
      // if (data.selectedItems[currentStep].length) {
      //   for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
      //     itemno += data.selectedItems[currentStep][i].quantity;
      //     if (data.selectedItems[currentStep][i].variant) {
      //       for (let j = 0; j < data.selectedItems[currentStep][i].variant.length; j++) {
      //         if (data.selectedItems[currentStep][i].variant[j].status == 1) {
      //           varicost += data.selectedItems[currentStep][i].variant[j].price;
      //         }
      //       }
      //     }
      //     cp += (data.selectedItems[currentStep][i].price + varicost) * data.selectedItems[currentStep][i].quantity;
      //     data.cartTotalPrice = cp;
      //     data.cartTotalItem = itemno;
      //   }
      // }
      // else {
      //   data.cartTotalPrice = 0;
      //   data.cartTotalItem = 0;
      // }
      this.orderService.setOrderData(data);
      // this.items = this.orderService.getOrderData().selectedItems;
    // }
  }

  gotToCategoryList(){
    this.router.navigate(['/waiter/order/:id/choose-category']);
  }
}
