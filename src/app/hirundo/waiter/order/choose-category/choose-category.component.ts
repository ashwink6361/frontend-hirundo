import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
  private categoryList = [];
  public categorySearchData: any[] = [];
  protected dataService: CompleterData;
  protected searchStr: string;
  protected selectedCategory = {};
  private categoryItems = [];
  public showItem: boolean = false;
  private orderId;
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('orderId')){
      this.orderId = JSON.parse(localStorage.getItem('orderId'));
    }
    this.orderService.getCategory()
      .then(data => {
        this.categoryList = data.data;
        if (this.categoryList.length) {
          for (var i = 0; i < this.categoryList.length; i++) {
            this.categorySearchData.push({
              _id: this.categoryList[i]._id,
              name: this.categoryList[i].name,
            });
          }
          this.dataService = this.completerService.local(this.categorySearchData, 'name', 'name');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  showItems(category) {
    let orderdata = this.orderService.getOrderData();
    orderdata.selectedCategory = category;
    orderdata.categoryItems = [];
    // orderdata.step1 = [];
    // orderdata.step2 = [];
    
    this.orderService.getCategoryItem().then(data => {
      if(data.data.length){
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == category._id) {
            orderdata.categoryItems = data.data[i].items;
            // orderdata.step1 = data.data[i].items;
            // orderdata.step2 = data.data[i].items;
            for (let j = 0; j < orderdata.categoryItems.length; j++) {
              orderdata.categoryItems[j].quantity = 0;
              orderdata.categoryItems[j].itemTotal = 0;
            }
            // console.log('orderdata.step1',orderdata.step1);
            // console.log('orderdata.step2',orderdata.step2);
            // for (let j = 0; j < orderdata.step1.length; j++) {
            //   console.log('orderdata.step1',orderdata.step1[j]);
            //   orderdata.step1[j].quantity = 0;
            //   orderdata.step1[j].itemTotal = 0;
            //   orderdata.step1[j].step = 'Uscita 1';
            //   console.log('orderdata.step1++++++',orderdata.step1[j]);              
            // }
            // for (let k = 0; k < orderdata.step2.length; k++) {
            //   console.log('orderdata.step2',orderdata.step2[k]);
              
            //   orderdata.step2[k].quantity = 0;
            //   orderdata.step2[k].itemTotal = 0;
            //   orderdata.step2[k].step = 'Uscita 2';     
            //   console.log('orderdata.step2++++++++',orderdata.step2[k]);
                       
            // }
          }
        }
      }
      this.orderService.setOrderData(orderdata);
      this.router.navigate(['/waiter/order/:id/choose-item']);
    })
      .catch(error => {
        console.log('error', error);
      });
  }
}
