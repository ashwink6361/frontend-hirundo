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
  private variantList = [];
  private noteList = [];
  public showVarient:  boolean = false;

  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    let data = this.orderService.getOrderData();
    console.log('data.data', data);
    if (data.categoryItems) {
      for (let i = 0; i < data.categoryItems.length; i++) {
        if (data.selectedItems.length) {
          for (let j = 0; j < data.selectedItems.length; j++) {
            if (data.selectedItems[j]._id == data.categoryItems[i]._id) {
              data.categoryItems[i].quantity = data.selectedItems[j].quantity;
            }
          }
        }
      }
      this.orderService.setOrderData(data);
      this.articles = this.orderService.getOrderData().categoryItems;
    }
    // this.searchStr = this.orderService.getOrderData().searchStr;
    // this.orderService.getCategory()
    //   .then(data => {
    //     this.categoryList = data.data;
    //     if (this.categoryList.length) {
    //       for (var i = 0; i < this.categoryList.length; i++) {
    //         this.categorySearchData.push({
    //           _id: this.categoryList[i]._id,
    //           name: this.categoryList[i].name,
    //         });
    //       }
    //       this.dataService = this.completerService.local(this.categorySearchData, 'name', 'name');
    //     }
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
      this.orderService.getVariantAndNotes()
      .then(data => {
        this.variantList = data.data.variants;
        this.noteList = data.data.notes;
      })
      .catch(error => {
        console.log('error', error);
      });
      // this.orderService.getNotes()
      // .then(data => {
      //   this.noteList = data.data;
      // })
      // .catch(error => {
      //   console.log('error', error);
      // });
  }

  increaseValue(article) {
    let value = article.quantity;
    value = isNaN(value) ? 0 : value;
    value++;
    article.quantity = value;
    let data = this.orderService.getOrderData();
    for (let i = 0; i < data.selectedItems.length; i++) {
      if (data.selectedItems[i]._id == article._id) {
        data.selectedItems.splice(i, 1);
      }
    }
    data.selectedItems.push(article);
    this.orderService.setOrderData(data);
  }

  decreaseValue(article) {
    let value = article.quantity;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    article.quantity = value;
    let data = this.orderService.getOrderData();
    for (let i = 0; i < data.selectedItems.length; i++) {
      if (data.selectedItems[i]._id == article._id) {
        data.selectedItems.splice(i, 1);
      }
    }
    if(article.quantity > 0){
      data.selectedItems.push(article);
    }
    this.orderService.setOrderData(data);
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
  viewCart() {
    this.router.navigate(['/waiter/order/:id/cart']);
  }

  viewVarient() {
    this.showVarient = true;
  }

  hideVarient(){
    this.showVarient = false;
  }
}
