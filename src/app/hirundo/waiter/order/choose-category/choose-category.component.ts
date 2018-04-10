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
    console.log('this.orderService.orderData',this.orderService.orderData);
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

  onSelected(item) {
    this.selectedCategory = item ? item.originalObject : {};
    if (this.selectedCategory) {
      this.dataService = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.orderService.getCategoryItem().then(data => {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == this.selectedCategory["_id"]) {
            this.categoryItems.push(data.data[i].items[0]);
          }
        }
      })
        .catch(error => {
          console.log('error', error);
        });
      this.showItem = true;
    }
  }

  showItems(id, name) {
    let obj = {
      _id: id,
      name: name
    }
    this.selectedCategory = obj;
    if (this.selectedCategory) {
      this.searchStr = this.selectedCategory["name"];
      this.dataService = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.orderService.getCategoryItem().then(data => {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == this.selectedCategory["_id"]) {
            this.categoryItems.push(data.data[i].items[0]);
          }
        }
      })
        .catch(error => {
          console.log('error', error);
        });
        this.router.navigate(['/waiter/order/:id/choose-item']);
    }
  }

}
