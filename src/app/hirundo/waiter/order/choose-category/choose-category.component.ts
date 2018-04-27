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
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
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
    this.orderService.getCategoryItem().then(data => {
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].category._id == category._id) {
          // for (let j = 0; j < data.data[i].subcategory.length; j++) {
          //   for (let k = 0; k < data.data[i].subcategory[j].items.length; k++) {
          //     orderdata.categoryItems.push(data.data[i].subcategory[j].items[k]);
          //     this.orderService.setOrderData(orderdata);
          //   }
          // }
        orderdata.categoryItems = data.data[i].items;
        this.orderService.setOrderData(orderdata);
        }
      }
      this.router.navigate(['/waiter/order/:id/choose-item']);
    })
      .catch(error => {
        console.log('error', error);
      });
  }
}
