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
  public activeTab: boolean = false;
  public data: any;
  public articleAdd: boolean = false;
  protected subcategory: string;
  public selectedSubcategory: boolean[] = [false];
  // public cartTotalPrice: number = 0;  
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    this.data = this.orderService.getOrderData();
    if (this.data.categoryItems) {
      for (let i = 0; i < this.data.categoryItems.length; i++) {
        if (this.data.selectedItems.length) {
          for (let j = 0; j < this.data.selectedItems.length; j++) {
            if (this.data.selectedItems[j]._id == this.data.categoryItems[i]._id) {
              this.data.categoryItems[i].quantity = this.data.selectedItems[j].quantity;
            }
          }
        }
      }
      this.orderService.setOrderData(this.data);
      this.articles = this.orderService.getOrderData().categoryItems;
      this.selectedSubcategory[-1] = true;
    }
      this.orderService.getVariantAndNotes()
      .then(data => {
        this.variantList = data.data.variants;
        this.noteList = data.data.notes;
      })
      .catch(error => {
        console.log('error', error);
      });
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
    let cp = 0;
    for (let i = 0; i < data.selectedItems.length; i++) {
      cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
      data.cartTotalPrice = cp;
    }
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
    else if(article.quantity == 0){
      for (let i = 0; i < data.categoryItems.length; i++) {
        if (data.categoryItems[i]._id == article._id) {
          delete data.categoryItems[i].quantity;
        }
      }
    }
    let cp = 0;
    if (data.selectedItems.length) {
      for (let i = 0; i < data.selectedItems.length; i++) {
        cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
        data.cartTotalPrice = cp;
      }
    }
    else {
      data.cartTotalPrice = 0;
    }
    this.orderService.setOrderData(data);
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

  tabActive(){
    this.activeTab = !this.activeTab;
  }

  addArticle(){
    this.articleAdd = true;
  }

  hideArticle(){
    this.articleAdd = false;
  }

  filterBySubcategory(subcategory, index){
    this.subcategory = subcategory;
    if(typeof index !== 'undefined'){
      this.selectedSubcategory[index] = true;
      this.selectedSubcategory[-1] = false;
      for (let i = 0; i < this.selectedSubcategory.length; i++) {
        if (index != i) {
          this.selectedSubcategory[i] = false;
        }
      }
    }
    else{
      this.selectedSubcategory[-1] = true;
      for (let i = 0; i < this.selectedSubcategory.length; i++) {
          this.selectedSubcategory[i] = false;
      }
    }
  }
}
