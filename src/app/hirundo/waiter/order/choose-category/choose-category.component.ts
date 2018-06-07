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
      });
  }

  showItems(category) {
    let orderdata = this.orderService.getOrderData();
    orderdata.selectedCategory = category;
    orderdata.categoryItems = {};    
    this.orderService.getCategoryItem().then(data => {
      if(data.data.length){
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == category._id) {
            console.log(this.globalService.getStepData());
            var steps = [];
            if (this.globalService.getStepData()) {
              steps = this.globalService.getStepData();
            }
            else {
              steps = ['Uscita 1', 'Uscita 2'];
            }
            for (let j = 0; j < steps.length; j++) {
              orderdata.categoryItems[steps[j]] = data.data[i].items;
              for (let k = 0; k < orderdata.categoryItems[steps[j]].length; k++) {
                orderdata.categoryItems[steps[j]][k].quantity = 0;
                orderdata.categoryItems[steps[j]][k].itemTotal = 0;
              }
            }
          }
        }
      }
      this.orderService.setOrderData(orderdata);
      this.router.navigate(['/waiter/order/:id/choose-item']);
    })
      .catch(error => {
      });
  }

  hideStep(){
    this.orderService.showElement = false;
    this.router.navigate(['/waiter/order/:id/cart']);
  }
}
