import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../hirundo/global.service';
import { OrderService } from '../../hirundo/waiter/order/order.service';
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  public stepArray = ['Uscita 1', 'Uscita 2'];
  public activetab: boolean[] = [];
  constructor(private globalService: GlobalService, private orderService: OrderService) { }

  ngOnInit() {
    let orderId = JSON.parse(localStorage.getItem('orderId'));
    if (orderId) {
      if (this.globalService.getTabData()) {
        this.activetab[this.globalService.getTabData().tab] = true;
      }
      else {
        this.activetab[0] = true;
      }
      var orderItems = JSON.parse(localStorage.getItem('orderItems'));
      if(this.globalService.getStepData()){
        this.stepArray = this.globalService.getStepData();
      }
      else{
        this.stepArray = ['Uscita 1', 'Uscita 2'];
      }
      for (var i = 0; i < orderItems.length; i++) {
        if (this.stepArray.indexOf(orderItems[i].step) < 0) {
          this.stepArray.push(orderItems[i].step);
        }
      }
      if(this.globalService.getTabData()){
        let tabdata = {
          tab: this.globalService.getTabData().tab,
          step: this.globalService.getTabData().step
        }
        this.globalService.setTabData(tabdata);
      }
      else{
        let tabdata = {
          tab: 0,
          step: this.stepArray[0]
        }
        this.globalService.setTabData(tabdata);
      }
      this.globalService.setStepData(this.stepArray);
    }
    let step = this.globalService.getStepData();
    let data = this.globalService.getTabData();
    if (step && step.length) {
      this.stepArray = step;
    }
    if (data && data.tab) {
      this.activetab[data.tab] = true;
      let stepdata = {
        tab: data.tab,
        step: data.step
      }
      this.globalService.setTabData(stepdata);
    }
    else {
      this.activetab[0] = true;
      let stepdata = {
        tab: 0,
        step: this.stepArray[0]
      }
      this.globalService.setTabData(stepdata);
    }
  }

  addStep() {
    let count = this.stepArray.length + 1;
    this.stepArray.push('Uscita ' + count);
    this.globalService.setStepData(this.stepArray);
    // let orderdata = this.orderService.getOrderData();
    // this.orderService.getCategoryItem().then(data => {
    //   if (data.data.length) {
    //     for (let i = 0; i < data.data.length; i++) {
    //       if (orderdata.selectedCategory && data.data[i].category._id == orderdata.selectedCategory._id) {
    //             let step = 'Uscita ' + count;
    //             orderdata.categoryItems[step] = data.data[i].items;
    //         console.log('orderdata.categoryItems+++++++++++++++', orderdata.categoryItems);
    //         for (let j = 0; j < orderdata.categoryItems[step].length; j++) {
    //           orderdata.categoryItems[step][j].quantity = 0;
    //           orderdata.categoryItems[step][j].itemTotal = 0;
    //         }
    //       }
    //     }
    //   }
    //   console.log('orderdata+++++++++++++++', orderdata);      
    //   this.orderService.setOrderData(orderdata);
    // })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
  }

  selectedTab(step, tab) {
    this.activetab[tab] = true;
    for (let i = 0; i < this.activetab.length; i++) {
      if (i != tab) {
        this.activetab[i] = false;
      }
    }
    let data = {
      tab: tab,
      step: step
    }
    this.globalService.setTabData(data);
  }
}
