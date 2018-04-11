import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public quantity: number = 0;
  private articles = [];
  private categoryList = [];
  public categorySearchData: any[] = [];
  protected dataService: CompleterData;
  protected searchStr: string;
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    this.articles = this.orderService.getOrderData().categoryItems;
    this.searchStr = this.orderService.getOrderData().searchStr;
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

  increaseValue() {
    let value = this.quantity;
    value = isNaN(value) ? 0 : value;
    value++;
    this.quantity = value;
  }

  decreaseValue() {
    let value = this.quantity;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    this.quantity = value;
  }

  onSelected(item) {
    let orderdata1 = this.orderService.getOrderData();
    orderdata1.selectedCategory = item ? item.originalObject : {};
    orderdata1.searchStr = this.searchStr;
    if (orderdata1.selectedCategory) {
      this.dataService = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.orderService.getCategoryItem().then(data => {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == orderdata1.selectedCategory["_id"]) {
            orderdata1.categoryItems = data.data[i].items;
            this.orderService.setOrderData(orderdata1);
            this.articles = this.orderService.getOrderData().categoryItems;
          }
        }
        this.router.navigate(['/waiter/order/:id/choose-item']);
      })
        .catch(error => {
          console.log('error', error);
        });
    }
  }
}
